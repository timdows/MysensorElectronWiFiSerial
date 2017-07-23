using Exporter.HouseDBService;
using Exporter.Models.Settings;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Serilog;
using System;
using System.IO;
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
			Task.Run(() => app.Run()).Wait();
		}

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
			services.AddSingleton(houseDBSettings);

			// Get other settings via API
			using (var client = new HouseDBAPI(new Uri(houseDBSettings.Url)))
			{
				var domoticzSettings = await client.SettingsGetDomoticzSettingsGetAsync();
				services.AddSingleton(domoticzSettings);
			}
			
			services.AddTransient<Application>();
		}

		private static async Task<HouseDBSettings> GetHouseDBSettings()
		{
			// Get settings from appconfig.json
			var appsettingsString = await File.ReadAllTextAsync(Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json"));
			var appsettings = JsonConvert.DeserializeObject<dynamic>(appsettingsString);
			return JsonConvert.DeserializeObject<HouseDBSettings>(appsettings.HouseDBSettings.ToString());
		}
	}
}
