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
	public class ExportKwhDeviceValues
    {
		private HouseDBSettings _houseDBSettings;
		private DomoticzSettings _domoticzSettings;
		private DateTime _lastExportDateTime;

		public ExportKwhDeviceValues(HouseDBSettings houseDBSettings, DomoticzSettings domoticzSettings)
		{
			_houseDBSettings = houseDBSettings;
			_domoticzSettings = domoticzSettings;
			_lastExportDateTime = DateTime.Today.AddDays(-1);
		}

		public async Task DoExport()
		{
			if (DateTime.Now.Hour == 0 && (DateTime.Now - _lastExportDateTime).Hours > 23)
			{
				_lastExportDateTime = DateTime.Now;
				Log.Debug("Starting ExportKwhDeviceValues - DoExport");

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
		}

		private async Task<DomoticzKwhValuesClientModel> GetDomoticzKwhValuesClientModel(Device device)
		{
			using (var client = new HttpClient())
			{
				var url = $"http://{_domoticzSettings.Host}:{_domoticzSettings.Port}/json.htm?type=graph&sensor=counter&idx={device.DomoticzKwhIdx}&range=year";
				var response = await client.GetStringAsync(url);
				var data = JsonConvert.DeserializeObject<dynamic>(response);
				JArray resultList = data.result;

				// Cast resultList to objects
				var values = resultList.ToObject<List<DomoticzKwhUsage>>();

				var clientModel = new DomoticzKwhValuesClientModel
				{
					Device = device,
					DomoticzKwhUsages = values
				};

				return clientModel;
			}
		}
	}
}
