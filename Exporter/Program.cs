using Exporter.Models.Settings;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Serilog;
using System;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;

namespace Exporter
{
	public class Program
    {
        public static void Main(string[] args)
        {
			IServiceCollection serviceCollection = new ServiceCollection();
			ConfigureServices(serviceCollection).Wait();
			IServiceProvider serviceProvider = serviceCollection.BuildServiceProvider();

			var app = serviceProvider.GetService<Application>();
			//app.Run().Wait();
			Task.Run(() => app.Run()).Wait();
		}

		//public IConfigurationRoot Configuration { get; }

		private static async Task ConfigureServices(IServiceCollection services)
		{
			Log.Logger = new LoggerConfiguration()
				.MinimumLevel.Debug()
				.Enrich.FromLogContext()
				.WriteTo.LiterateConsole()
				.WriteTo.RollingFile("logs/log-{Date}.txt")
				.CreateLogger();

			// Support typed Options
			services.AddOptions();

			var houseDBSettings = await GetHouseDBSettings();
			var domoticzSettings = await GetDomoticzSettings(houseDBSettings);

			services.AddSingleton(houseDBSettings);
			services.AddSingleton(domoticzSettings);

			services.AddTransient<Application>();
		}

		private static async Task<HouseDBSettings> GetHouseDBSettings()
		{
			// Get settings from appconfig.json
			var appsettingsString = await File.ReadAllTextAsync(Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json"));
			var appsettings = JsonConvert.DeserializeObject<dynamic>(appsettingsString);
			return JsonConvert.DeserializeObject<HouseDBSettings>(appsettings.HouseDBSettings.ToString());
		}

		private static async Task<DomoticzSettings> GetDomoticzSettings(HouseDBSettings houseDBSettings)
		{
			// Get settings from server
			using (var client = new HttpClient())
			{
				var response = await client.GetStringAsync(houseDBSettings.Url + "settings/GetDomoticzSettings.json");
				return JsonConvert.DeserializeObject<DomoticzSettings>(response);
			}
		}

	}
}
