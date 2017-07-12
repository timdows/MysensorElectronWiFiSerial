using Exporter.Models.Settings;
using Newtonsoft.Json;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Exporter
{
	public class Program
    {
        public static void Main(string[] args)
        {
			new Program().Run().Wait();
		}

		private HouseDBSettings _houseDBSettings;
        private DomoticzSettings _domoticzSettings;

        public async Task Run()
        {
			await GetSettings();
			await GetCurrentWattValue();
        }

		private async Task GetSettings()
		{
			// Get settings from appconfig.json
			var appsettingsString = await File.ReadAllTextAsync(Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json"));
			var appsettings = JsonConvert.DeserializeObject<dynamic>(appsettingsString);
			_houseDBSettings = JsonConvert.DeserializeObject<HouseDBSettings>(appsettings.HouseDBSettings.ToString());

			// Get settings from HouseDB server
			using (var client = new HttpClient())
			{
				var response = await client.GetStringAsync(_houseDBSettings.Url + "settings/GetDomoticzSettings.json");
				_domoticzSettings = JsonConvert.DeserializeObject<DomoticzSettings>(response);
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

				// Post it to the HouseDB server
				url = $"{_houseDBSettings.Url}/Exporter/InsertCurrentWattValue";
				await client.PostAsync(url, new StringContent(watt, Encoding.UTF8, "application/json"));
			}
		}

	}
}
