using Exporter.HouseDBService;
using Exporter.HouseDBService.Models;
using Exporter.Models.Settings;
using Serilog;
using System;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;

namespace Exporter.Exporters
{
	public class ExportDatabase
    {
		private HouseDBSettings _houseDBSettings;
		private DomoticzSettings _domoticzSettings;
		private DateTime _lastExportDatabase;

		public ExportDatabase(HouseDBSettings houseDBSettings, DomoticzSettings domoticzSettings)
		{
			_houseDBSettings = houseDBSettings;
			_domoticzSettings = domoticzSettings;
			_lastExportDatabase = DateTime.Today.AddDays(-1);
		}

		private async Task DoExport()
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

						var byteArray = await response.Content.ReadAsByteArrayAsync();

						//var directory = Path.Combine(Directory.GetCurrentDirectory(), "../exports");
						//var file = Path.Combine(directory, $"{DateTime.Today.ToString("yyyy-MM-ddTHH:mm")}.db");
						//Log.Debug($"Writing to file {file}");

						//using (var fileStream = File.Create(file))
						//using (var reader = new StreamReader(contentStream))
						//{
						//	contentStream.CopyTo(fileStream);
						//	fileStream.Flush();

						//	//client.PostAsync("", fileStream);
						//	using (var api = new HouseDBAPI(new Uri(_houseDBSettings.Url)))
						//	{
						//		await api.ExporterUploadDatabasePostAsync()
						//	}
						//}
					}
				}
			}
		}
	}
}
