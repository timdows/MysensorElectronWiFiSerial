using Exporter.HouseDBService;
using Exporter.HouseDBService.Models;
using Exporter.Models.Settings;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace Exporter.Exporters
{
	public class ExportKwhDeviceValues
    {
		private HouseDBSettings _houseDBSettings;
		private DomoticzSettings _domoticzSettings;

		public ExportKwhDeviceValues(HouseDBSettings houseDBSettings, DomoticzSettings domoticzSettings)
		{
			_houseDBSettings = houseDBSettings;
			_domoticzSettings = domoticzSettings;
		}

		public async Task DoExport()
		{
			using (var api = new HouseDBAPI(new Uri(_houseDBSettings.Url)))
			{
				var devices = await api.DeviceGetAllKwhExportDevicesGetAsync();
				
				foreach (var device in devices)
				{
					var clientModel = await GetDomoticzKwhValuesClientModel(device);
					await api.ExporterInsertDomoticzKwhValuesPostAsync(clientModel);
				}
			}
		}

		private async Task<DomoticzKwhValuesClientModel> GetDomoticzKwhValuesClientModel(Device device)
		{
			using (var client = new HttpClient())
			{
				var url = $"http://{_domoticzSettings.Host}:{_domoticzSettings.Port}/json.htm?type=graph&sensor=counter&idx={device.DomoticzIdx}&range=year";
				var response = await client.GetStringAsync(url);
				var data = JsonConvert.DeserializeObject<dynamic>(response);
				JArray resultList = data.result;

				// Cast resultList to objects
				var values = resultList.ToObject<List<DomoticzKwhValue>>();

				var clientModel = new DomoticzKwhValuesClientModel
				{
					Device = device,
					DomoticzKwhValues = values
				};

				return clientModel;
			}
		}
	}
}
