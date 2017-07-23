// Code generated by Microsoft (R) AutoRest Code Generator 1.2.2.0
// Changes may cause incorrect behavior and will be lost if the code is
// regenerated.

namespace Exporter.HouseDBService.Models
{
    using Exporter.HouseDBService;
    using Newtonsoft.Json;
    using System.Linq;

    public partial class VeraSettings
    {
        /// <summary>
        /// Initializes a new instance of the VeraSettings class.
        /// </summary>
        public VeraSettings()
        {
          CustomInit();
        }

        /// <summary>
        /// Initializes a new instance of the VeraSettings class.
        /// </summary>
        public VeraSettings(string veraIpAddress = default(string), string username = default(string), string password = default(string), string dataMineDirectoryPath = default(string), string exportPathOnPi = default(string), int? wattChannel = default(int?))
        {
            VeraIpAddress = veraIpAddress;
            Username = username;
            Password = password;
            DataMineDirectoryPath = dataMineDirectoryPath;
            ExportPathOnPi = exportPathOnPi;
            WattChannel = wattChannel;
            CustomInit();
        }

        /// <summary>
        /// An initialization method that performs custom operations like setting defaults
        /// </summary>
        partial void CustomInit();

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "veraIpAddress")]
        public string VeraIpAddress { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "username")]
        public string Username { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "password")]
        public string Password { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "dataMineDirectoryPath")]
        public string DataMineDirectoryPath { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "exportPathOnPi")]
        public string ExportPathOnPi { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "wattChannel")]
        public int? WattChannel { get; set; }

    }
}
