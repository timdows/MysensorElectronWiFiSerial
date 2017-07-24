using Exporter.Exporters;
using Exporter.HouseDBService.Models;
using Exporter.Models;
using Exporter.Models.Settings;
using Newtonsoft.Json;
using Serilog;
using System;
using System.Collections.Generic;
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
		

		public Application(HouseDBSettings houseDBSettings, DomoticzSettings domoticzSettings)
		{
			_houseDBSettings = houseDBSettings;
			_domoticzSettings = domoticzSettings;
		}

		public async Task Run()
		{
			Log.Information("Starting Application.Run()");

			while (true)
			{
				//var exportDatabase = ExportDatabase();
				var exportDomoticzP1Consumption = ExportDomoticzP1Consumption();
				var exportKwhDeviceValues = new ExportKwhDeviceValues(_houseDBSettings, _domoticzSettings);
				var exportValuesForCaching = new ExportValuesForCaching(_houseDBSettings, _domoticzSettings);

				await Task.WhenAll(
					//exportDatabase,
					exportDomoticzP1Consumption,
					exportKwhDeviceValues.DoExport(),
					exportValuesForCaching.DoExport(),
					Task.Delay(5000));
			}
		}

		/// <summary>
		/// The complete energy usage
		/// </summary>
		/// <returns></returns>
		private async Task ExportDomoticzP1Consumption()
		{
			Log.Information("Starting ExportDomoticzP1Consumption()");

			using (var client = new HttpClient())
			{
				// Get the list with values
				var url = $"http://{_domoticzSettings.Host}:{_domoticzSettings.Port}/json.htm?type=graph&sensor=counter&idx={_domoticzSettings.WattIdx}&range=year";
				var response = await client.GetStringAsync(url);
				var data = JsonConvert.DeserializeObject<dynamic>(response);
				var resultList = data.result;

				// Post it away
				url = $"{_houseDBSettings.Url}Exporter/InsertDomoticzP1Consumption";
				var postBody = JsonConvert.SerializeObject(resultList);
				await client.PostAsync(url, new StringContent(postBody, Encoding.UTF8, "application/json"));
			}
		}
	}
}
