// Code generated by Microsoft (R) AutoRest Code Generator 1.2.2.0
// Changes may cause incorrect behavior and will be lost if the code is
// regenerated.

namespace Exporter.HouseDBService.Models
{
    using Exporter.HouseDBService;
    using Newtonsoft.Json;
    using System.Collections;
    using System.Collections.Generic;
    using System.Linq;

    public partial class DomoticzKwhValuesClientModel
    {
        /// <summary>
        /// Initializes a new instance of the DomoticzKwhValuesClientModel
        /// class.
        /// </summary>
        public DomoticzKwhValuesClientModel()
        {
          CustomInit();
        }

        /// <summary>
        /// Initializes a new instance of the DomoticzKwhValuesClientModel
        /// class.
        /// </summary>
        public DomoticzKwhValuesClientModel(Device device = default(Device), IList<DomoticzKwhUsage> domoticzKwhUsages = default(IList<DomoticzKwhUsage>))
        {
            Device = device;
            DomoticzKwhUsages = domoticzKwhUsages;
            CustomInit();
        }

        /// <summary>
        /// An initialization method that performs custom operations like setting defaults
        /// </summary>
        partial void CustomInit();

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "device")]
        public Device Device { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "domoticzKwhUsages")]
        public IList<DomoticzKwhUsage> DomoticzKwhUsages { get; set; }

    }
}
