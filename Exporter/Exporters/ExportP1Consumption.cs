using Exporter.HouseDBService;
using Exporter.HouseDBService.Models;
using Exporter.Models.Settings;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Serilog;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace Exporter.Exporters
{
	/// <summary>
	/// Export the complete year stats from P1
	/// This is stored in cache by the HouseDBAPI, and later used for seven segment
	/// </summary>
    public class ExportP1Consumption
    {
		private HouseDBSettings _houseDBSettings;
		private DomoticzSettings _domoticzSettings;

		public ExportP1Consumption(HouseDBSettings houseDBSettings, DomoticzSettings domoticzSettings)
		{
			_houseDBSettings = houseDBSettings;
			_domoticzSettings = domoticzSettings;
		}

		public async Task DoExport()
		{
			Log.Information("Starting ExportDomoticzP1Consumption()");

			using (var client = new HttpClient())
			{
				// Get the list with values
				var url = $"http://{_domoticzSettings.Host}:{_domoticzSettings.Port}/json.htm?type=graph&sensor=counter&idx={_domoticzSettings.WattIdx}&range=year";
				var response = await client.GetStringAsync(url);
				var data = JsonConvert.DeserializeObject<dynamic>(response);
				JArray resultList = data.result;

				// Cast resultList to objects
				var values = resultList.ToObject<List<DomoticzP1Consumption>>();

				// Post it away
				using (var api = new HouseDBAPI(new Uri(_houseDBSettings.Url)))
				{
					await api.ExporterInsertDomoticzP1ConsumptionPostAsync(values);
				}
			}
		}
	}
}
