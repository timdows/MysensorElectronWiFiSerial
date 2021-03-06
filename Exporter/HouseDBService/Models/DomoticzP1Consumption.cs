// Code generated by Microsoft (R) AutoRest Code Generator 1.2.2.0
// Changes may cause incorrect behavior and will be lost if the code is
// regenerated.

namespace Exporter.HouseDBService.Models
{
    using Exporter.HouseDBService;
    using Newtonsoft.Json;
    using System.Linq;

    public partial class DomoticzP1Consumption
    {
        /// <summary>
        /// Initializes a new instance of the DomoticzP1Consumption class.
        /// </summary>
        public DomoticzP1Consumption()
        {
          CustomInit();
        }

        /// <summary>
        /// Initializes a new instance of the DomoticzP1Consumption class.
        /// </summary>
        public DomoticzP1Consumption(string c1 = default(string), string c2 = default(string), string c3 = default(string), string c4 = default(string), string d = default(string), string r1 = default(string), string r2 = default(string), string v = default(string), string v2 = default(string), System.DateTime? date = default(System.DateTime?), double? dayUsage = default(double?))
        {
            C1 = c1;
            C2 = c2;
            C3 = c3;
            C4 = c4;
            D = d;
            R1 = r1;
            R2 = r2;
            V = v;
            V2 = v2;
            Date = date;
            DayUsage = dayUsage;
            CustomInit();
        }

        /// <summary>
        /// An initialization method that performs custom operations like setting defaults
        /// </summary>
        partial void CustomInit();

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "c1")]
        public string C1 { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "c2")]
        public string C2 { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "c3")]
        public string C3 { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "c4")]
        public string C4 { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "d")]
        public string D { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "r1")]
        public string R1 { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "r2")]
        public string R2 { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "v")]
        public string V { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "v2")]
        public string V2 { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "date")]
        public System.DateTime? Date { get; private set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "dayUsage")]
        public double? DayUsage { get; private set; }

    }
}
