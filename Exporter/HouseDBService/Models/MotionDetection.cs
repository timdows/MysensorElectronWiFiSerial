// Code generated by Microsoft (R) AutoRest Code Generator 1.2.2.0
// Changes may cause incorrect behavior and will be lost if the code is
// regenerated.

namespace Exporter.HouseDBService.Models
{
    using Exporter.HouseDBService;
    using Newtonsoft.Json;
    using System.Linq;

    public partial class MotionDetection
    {
        /// <summary>
        /// Initializes a new instance of the MotionDetection class.
        /// </summary>
        public MotionDetection()
        {
          CustomInit();
        }

        /// <summary>
        /// Initializes a new instance of the MotionDetection class.
        /// </summary>
        public MotionDetection(Device device = default(Device), System.DateTime? dateTimeDetection = default(System.DateTime?), long? id = default(long?))
        {
            Device = device;
            DateTimeDetection = dateTimeDetection;
            Id = id;
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
        [JsonProperty(PropertyName = "dateTimeDetection")]
        public System.DateTime? DateTimeDetection { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "id")]
        public long? Id { get; set; }

    }
}
