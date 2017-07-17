using Exporter.Models.Settings;
using Newtonsoft.Json;
using Serilog;
using System;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Exporter
{
	public class Application
    {
		private HouseDBSettings _houseDBSettings;
		private DomoticzSettings _domoticzSettings;
		private DateTime _lastExportDatabase;

		public Application(HouseDBSettings houseDBSettings, DomoticzSettings domoticzSettings)
		{
			_houseDBSettings = houseDBSettings;
			_domoticzSettings = domoticzSettings;
			_lastExportDatabase = DateTime.Today.AddDays(-1);
		}

		public async Task Run()
		{
			while (true)
			{
				var exportDatabase = ExportDatabase();
				var getCurrentWattValue = GetCurrentWattValue();

				await Task.WhenAll(
					exportDatabase,
					getCurrentWattValue,
					Task.Delay(5000));
			}
		}

		private async Task GetCurrentWattValue()
		{
			using (var client = new HttpClient())
			{
				// Get the watt value
				var url = $"http://{_domoticzSettings.Host}:{_domoticzSettings.Port}/json.htm?type=devices&rid={_domoticzSettings.WattIdx}";
				var response = await client.GetStringAsync(url);
				var data = JsonConvert.DeserializeObject<dynamic>(response);
				string usage = data.result[0].Usage.ToString();
				var watt = usage.Replace(" Watt", string.Empty);

				Log.Debug(usage);

				// Post it to the HouseDB server
				url = $"{_houseDBSettings.Url}/Exporter/InsertCurrentWattValue";
				await client.PostAsync(url, new StringContent(watt, Encoding.UTF8, "application/json"));
			}
		}

		private async Task ExportDatabase()
		{
			// Check if we should export
			if (DateTime.Now.Hour == 0 && (DateTime.Now - _lastExportDatabase).Hours > 23)
			{
				_lastExportDatabase = DateTime.Now;
				Log.Debug("Starting ExportDatabase");

				using (var client = new HttpClient())
				{
					client.Timeout = TimeSpan.FromMinutes(1);
					//var database = client.GetStreamAsync($"http://{_domoticzSettings.Host}:{_domoticzSettings.Port}/backupdatabase.php");

					var url = $"http://{_domoticzSettings.Host}:{_domoticzSettings.Port}/backupdatabase.php";
					using (var response = client.GetAsync(url, HttpCompletionOption.ResponseHeadersRead).Result)
					{
						response.EnsureSuccessStatusCode();

						using (var contentStream = await response.Content.ReadAsStreamAsync())
						{
							var directory = Path.Combine(Directory.GetCurrentDirectory(), "../exports");
							var file = Path.Combine(directory, $"{DateTime.Today.ToString("yyyy-MM-ddTHH:mm")}.db");
							Log.Debug($"Writing to file {file}");

							using (var fileStream = File.Create(file))
							using (var reader = new StreamReader(contentStream))
							{
								contentStream.CopyTo(fileStream);
								fileStream.Flush();

								//client.PostAsync("", fileStream);
							}
						}
					}
				}
			}
		}
	}
}
