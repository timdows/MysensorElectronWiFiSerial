using Exporter.HouseDBService;
using Exporter.HouseDBService.Models;
using Exporter.Models.Settings;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Exporter.Exporters
{
	public class ExportMotionDetection
    {
		private HouseDBSettings _houseDBSettings;
		private DomoticzSettings _domoticzSettings;

		public ExportMotionDetection(HouseDBSettings houseDBSettings, DomoticzSettings domoticzSettings)
		{
			_houseDBSettings = houseDBSettings;
			_domoticzSettings = domoticzSettings;
		}

		public async Task DoExport()
		{
			Log.Debug("Starting ExportMotionDetection - DoExport");

			using (var api = new HouseDBAPI(new Uri(_houseDBSettings.Url)))
			{
				var devices = await api.DeviceGetAllMotionDetectionDevicesGetAsync();

				foreach (var device in devices)
				{
					var clientModel = await GetMotionDetectionClientModel(device, true);
					await api.ExporterInsertMotionDetectionValuesPostAsync(clientModel);
				}
			}
		}

		private async Task<DomoticzMotionDetectionClientModel> GetMotionDetectionClientModel(Device device, bool onlyExportOneDay)
		{
			using (var client = new HttpClient())
			{
				var url = $"http://{_domoticzSettings.Host}:{_domoticzSettings.Port}/json.htm?type=lightlog&idx={device.DomoticzMotionDetectionIdx}";
				var response = await client.GetStringAsync(url);
				var data = JsonConvert.DeserializeObject<dynamic>(response);
				JArray resultList = data.result;

				// Cast resultList to objects
				var values = resultList.ToObject<List<DomoticzMotionDetection>>();

				if (onlyExportOneDay)
				{
					var thirtyDaysAgo = DateTime.Today.AddDays(-1);
					values = values
						.Where(a_item => a_item.Date.Value.Date >= thirtyDaysAgo)
						.ToList();
				}

				var clientModel = new DomoticzMotionDetectionClientModel
				{
					Device = device,
					MotionDetections = values
				};

				return clientModel;
			}
		}
	}
}
