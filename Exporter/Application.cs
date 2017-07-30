using Exporter.Exporters;
using Exporter.HouseDBService.Models;
using Exporter.Models.Settings;
using Serilog;
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

			var exportP1Consumption = new ExportP1Consumption(_houseDBSettings, _domoticzSettings);
			var exportKwhDeviceValues = new ExportKwhDeviceValues(_houseDBSettings, _domoticzSettings);
			var exportValuesForCaching = new ExportValuesForCaching(_houseDBSettings, _domoticzSettings);
			var exportDatabase = new ExportDatabase(_houseDBSettings, _domoticzSettings);
			var exportMotionDetection = new ExportMotionDetection(_houseDBSettings, _domoticzSettings);

			while (true)
			{
				await Task.WhenAll(
					exportP1Consumption.DoExport(),
					exportKwhDeviceValues.DoExport(),
					exportValuesForCaching.DoExport(),
					exportDatabase.DoExport(),
					exportMotionDetection.DoExport(),
					Task.Delay(5000));
			}
		}
	}
}
