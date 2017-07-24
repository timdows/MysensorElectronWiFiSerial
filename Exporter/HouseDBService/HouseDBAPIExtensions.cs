// Code generated by Microsoft (R) AutoRest Code Generator 1.2.2.0
// Changes may cause incorrect behavior and will be lost if the code is
// regenerated.

namespace Exporter.HouseDBService
{
    using Models;
    using System.Collections;
    using System.Collections.Generic;
    using System.Threading;
    using System.Threading.Tasks;

    /// <summary>
    /// Extension methods for HouseDBAPI.
    /// </summary>
    public static partial class HouseDBAPIExtensions
    {
            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='deviceID'>
            /// </param>
            public static Device DeviceGetDeviceGet(this IHouseDBAPI operations, long? deviceID = default(long?))
            {
                return operations.DeviceGetDeviceGetAsync(deviceID).GetAwaiter().GetResult();
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='deviceID'>
            /// </param>
            /// <param name='cancellationToken'>
            /// The cancellation token.
            /// </param>
            public static async Task<Device> DeviceGetDeviceGetAsync(this IHouseDBAPI operations, long? deviceID = default(long?), CancellationToken cancellationToken = default(CancellationToken))
            {
                using (var _result = await operations.DeviceGetDeviceGetWithHttpMessagesAsync(deviceID, null, cancellationToken).ConfigureAwait(false))
                {
                    return _result.Body;
                }
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            public static IList<Device> DeviceGetAllKwhExportDevicesGet(this IHouseDBAPI operations)
            {
                return operations.DeviceGetAllKwhExportDevicesGetAsync().GetAwaiter().GetResult();
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='cancellationToken'>
            /// The cancellation token.
            /// </param>
            public static async Task<IList<Device>> DeviceGetAllKwhExportDevicesGetAsync(this IHouseDBAPI operations, CancellationToken cancellationToken = default(CancellationToken))
            {
                using (var _result = await operations.DeviceGetAllKwhExportDevicesGetWithHttpMessagesAsync(null, cancellationToken).ConfigureAwait(false))
                {
                    return _result.Body;
                }
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            public static IList<Device> DeviceGetAllDevicesForCachingValuesGet(this IHouseDBAPI operations)
            {
                return operations.DeviceGetAllDevicesForCachingValuesGetAsync().GetAwaiter().GetResult();
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='cancellationToken'>
            /// The cancellation token.
            /// </param>
            public static async Task<IList<Device>> DeviceGetAllDevicesForCachingValuesGetAsync(this IHouseDBAPI operations, CancellationToken cancellationToken = default(CancellationToken))
            {
                using (var _result = await operations.DeviceGetAllDevicesForCachingValuesGetWithHttpMessagesAsync(null, cancellationToken).ConfigureAwait(false))
                {
                    return _result.Body;
                }
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='domoticzP1Consumptions'>
            /// </param>
            public static void ExporterInsertDomoticzP1ConsumptionPost(this IHouseDBAPI operations, IList<DomoticzP1Consumption> domoticzP1Consumptions = default(IList<DomoticzP1Consumption>))
            {
                operations.ExporterInsertDomoticzP1ConsumptionPostAsync(domoticzP1Consumptions).GetAwaiter().GetResult();
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='domoticzP1Consumptions'>
            /// </param>
            /// <param name='cancellationToken'>
            /// The cancellation token.
            /// </param>
            public static async Task ExporterInsertDomoticzP1ConsumptionPostAsync(this IHouseDBAPI operations, IList<DomoticzP1Consumption> domoticzP1Consumptions = default(IList<DomoticzP1Consumption>), CancellationToken cancellationToken = default(CancellationToken))
            {
                (await operations.ExporterInsertDomoticzP1ConsumptionPostWithHttpMessagesAsync(domoticzP1Consumptions, null, cancellationToken).ConfigureAwait(false)).Dispose();
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='clientModel'>
            /// </param>
            public static void ExporterInsertDomoticzKwhValuesPost(this IHouseDBAPI operations, DomoticzKwhValuesClientModel clientModel = default(DomoticzKwhValuesClientModel))
            {
                operations.ExporterInsertDomoticzKwhValuesPostAsync(clientModel).GetAwaiter().GetResult();
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='clientModel'>
            /// </param>
            /// <param name='cancellationToken'>
            /// The cancellation token.
            /// </param>
            public static async Task ExporterInsertDomoticzKwhValuesPostAsync(this IHouseDBAPI operations, DomoticzKwhValuesClientModel clientModel = default(DomoticzKwhValuesClientModel), CancellationToken cancellationToken = default(CancellationToken))
            {
                (await operations.ExporterInsertDomoticzKwhValuesPostWithHttpMessagesAsync(clientModel, null, cancellationToken).ConfigureAwait(false)).Dispose();
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='clientModel'>
            /// </param>
            public static void ExporterInsertValuesForCachingPost(this IHouseDBAPI operations, DomoticzValuesForCachingClientModel clientModel = default(DomoticzValuesForCachingClientModel))
            {
                operations.ExporterInsertValuesForCachingPostAsync(clientModel).GetAwaiter().GetResult();
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='clientModel'>
            /// </param>
            /// <param name='cancellationToken'>
            /// The cancellation token.
            /// </param>
            public static async Task ExporterInsertValuesForCachingPostAsync(this IHouseDBAPI operations, DomoticzValuesForCachingClientModel clientModel = default(DomoticzValuesForCachingClientModel), CancellationToken cancellationToken = default(CancellationToken))
            {
                (await operations.ExporterInsertValuesForCachingPostWithHttpMessagesAsync(clientModel, null, cancellationToken).ConfigureAwait(false)).Dispose();
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='files'>
            /// </param>
            public static void ExporterUploadDatabasePost(this IHouseDBAPI operations, IList<IFormFile> files = default(IList<IFormFile>))
            {
                operations.ExporterUploadDatabasePostAsync(files).GetAwaiter().GetResult();
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='files'>
            /// </param>
            /// <param name='cancellationToken'>
            /// The cancellation token.
            /// </param>
            public static async Task ExporterUploadDatabasePostAsync(this IHouseDBAPI operations, IList<IFormFile> files = default(IList<IFormFile>), CancellationToken cancellationToken = default(CancellationToken))
            {
                (await operations.ExporterUploadDatabasePostWithHttpMessagesAsync(files, null, cancellationToken).ConfigureAwait(false)).Dispose();
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            public static void HeaterGetAllGet(this IHouseDBAPI operations)
            {
                operations.HeaterGetAllGetAsync().GetAwaiter().GetResult();
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='cancellationToken'>
            /// The cancellation token.
            /// </param>
            public static async Task HeaterGetAllGetAsync(this IHouseDBAPI operations, CancellationToken cancellationToken = default(CancellationToken))
            {
                (await operations.HeaterGetAllGetWithHttpMessagesAsync(null, cancellationToken).ConfigureAwait(false)).Dispose();
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            public static void HeaterGetClientModelGet(this IHouseDBAPI operations)
            {
                operations.HeaterGetClientModelGetAsync().GetAwaiter().GetResult();
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='cancellationToken'>
            /// The cancellation token.
            /// </param>
            public static async Task HeaterGetClientModelGetAsync(this IHouseDBAPI operations, CancellationToken cancellationToken = default(CancellationToken))
            {
                (await operations.HeaterGetClientModelGetWithHttpMessagesAsync(null, cancellationToken).ConfigureAwait(false)).Dispose();
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            public static VeraSettings SettingsGetVeraSettingsGet(this IHouseDBAPI operations)
            {
                return operations.SettingsGetVeraSettingsGetAsync().GetAwaiter().GetResult();
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='cancellationToken'>
            /// The cancellation token.
            /// </param>
            public static async Task<VeraSettings> SettingsGetVeraSettingsGetAsync(this IHouseDBAPI operations, CancellationToken cancellationToken = default(CancellationToken))
            {
                using (var _result = await operations.SettingsGetVeraSettingsGetWithHttpMessagesAsync(null, cancellationToken).ConfigureAwait(false))
                {
                    return _result.Body;
                }
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            public static DataMineSettings SettingsGetDataMineSettingsGet(this IHouseDBAPI operations)
            {
                return operations.SettingsGetDataMineSettingsGetAsync().GetAwaiter().GetResult();
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='cancellationToken'>
            /// The cancellation token.
            /// </param>
            public static async Task<DataMineSettings> SettingsGetDataMineSettingsGetAsync(this IHouseDBAPI operations, CancellationToken cancellationToken = default(CancellationToken))
            {
                using (var _result = await operations.SettingsGetDataMineSettingsGetWithHttpMessagesAsync(null, cancellationToken).ConfigureAwait(false))
                {
                    return _result.Body;
                }
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            public static RaspicamSettings SettingsGetRaspicamSettingsGet(this IHouseDBAPI operations)
            {
                return operations.SettingsGetRaspicamSettingsGetAsync().GetAwaiter().GetResult();
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='cancellationToken'>
            /// The cancellation token.
            /// </param>
            public static async Task<RaspicamSettings> SettingsGetRaspicamSettingsGetAsync(this IHouseDBAPI operations, CancellationToken cancellationToken = default(CancellationToken))
            {
                using (var _result = await operations.SettingsGetRaspicamSettingsGetWithHttpMessagesAsync(null, cancellationToken).ConfigureAwait(false))
                {
                    return _result.Body;
                }
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            public static DomoticzSettings SettingsGetDomoticzSettingsGet(this IHouseDBAPI operations)
            {
                return operations.SettingsGetDomoticzSettingsGetAsync().GetAwaiter().GetResult();
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='cancellationToken'>
            /// The cancellation token.
            /// </param>
            public static async Task<DomoticzSettings> SettingsGetDomoticzSettingsGetAsync(this IHouseDBAPI operations, CancellationToken cancellationToken = default(CancellationToken))
            {
                using (var _result = await operations.SettingsGetDomoticzSettingsGetWithHttpMessagesAsync(null, cancellationToken).ConfigureAwait(false))
                {
                    return _result.Body;
                }
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            public static void SevenSegmentGetClientModeljsonGet(this IHouseDBAPI operations)
            {
                operations.SevenSegmentGetClientModeljsonGetAsync().GetAwaiter().GetResult();
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='cancellationToken'>
            /// The cancellation token.
            /// </param>
            public static async Task SevenSegmentGetClientModeljsonGetAsync(this IHouseDBAPI operations, CancellationToken cancellationToken = default(CancellationToken))
            {
                (await operations.SevenSegmentGetClientModeljsonGetWithHttpMessagesAsync(null, cancellationToken).ConfigureAwait(false)).Dispose();
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            public static void SevenSegmentGetDebugCacheDatajsonGet(this IHouseDBAPI operations)
            {
                operations.SevenSegmentGetDebugCacheDatajsonGetAsync().GetAwaiter().GetResult();
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='cancellationToken'>
            /// The cancellation token.
            /// </param>
            public static async Task SevenSegmentGetDebugCacheDatajsonGetAsync(this IHouseDBAPI operations, CancellationToken cancellationToken = default(CancellationToken))
            {
                (await operations.SevenSegmentGetDebugCacheDatajsonGetWithHttpMessagesAsync(null, cancellationToken).ConfigureAwait(false)).Dispose();
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='postGetKwhYearUsage'>
            /// </param>
            public static void StatisticsGetKwhYearUsagePost(this IHouseDBAPI operations, PostGetKwhYearUsage postGetKwhYearUsage = default(PostGetKwhYearUsage))
            {
                operations.StatisticsGetKwhYearUsagePostAsync(postGetKwhYearUsage).GetAwaiter().GetResult();
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='postGetKwhYearUsage'>
            /// </param>
            /// <param name='cancellationToken'>
            /// The cancellation token.
            /// </param>
            public static async Task StatisticsGetKwhYearUsagePostAsync(this IHouseDBAPI operations, PostGetKwhYearUsage postGetKwhYearUsage = default(PostGetKwhYearUsage), CancellationToken cancellationToken = default(CancellationToken))
            {
                (await operations.StatisticsGetKwhYearUsagePostWithHttpMessagesAsync(postGetKwhYearUsage, null, cancellationToken).ConfigureAwait(false)).Dispose();
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='localPath'>
            /// </param>
            public static void VeraExportTestPost(this IHouseDBAPI operations, string localPath = default(string))
            {
                operations.VeraExportTestPostAsync(localPath).GetAwaiter().GetResult();
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='localPath'>
            /// </param>
            /// <param name='cancellationToken'>
            /// The cancellation token.
            /// </param>
            public static async Task VeraExportTestPostAsync(this IHouseDBAPI operations, string localPath = default(string), CancellationToken cancellationToken = default(CancellationToken))
            {
                (await operations.VeraExportTestPostWithHttpMessagesAsync(localPath, null, cancellationToken).ConfigureAwait(false)).Dispose();
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='files'>
            /// </param>
            public static void VeraExportUploadPost(this IHouseDBAPI operations, IList<object> files = default(IList<object>))
            {
                operations.VeraExportUploadPostAsync(files).GetAwaiter().GetResult();
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='files'>
            /// </param>
            /// <param name='cancellationToken'>
            /// The cancellation token.
            /// </param>
            public static async Task VeraExportUploadPostAsync(this IHouseDBAPI operations, IList<object> files = default(IList<object>), CancellationToken cancellationToken = default(CancellationToken))
            {
                (await operations.VeraExportUploadPostWithHttpMessagesAsync(files, null, cancellationToken).ConfigureAwait(false)).Dispose();
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            public static void VeraExportGetExportFileStatsGet(this IHouseDBAPI operations)
            {
                operations.VeraExportGetExportFileStatsGetAsync().GetAwaiter().GetResult();
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='cancellationToken'>
            /// The cancellation token.
            /// </param>
            public static async Task VeraExportGetExportFileStatsGetAsync(this IHouseDBAPI operations, CancellationToken cancellationToken = default(CancellationToken))
            {
                (await operations.VeraExportGetExportFileStatsGetWithHttpMessagesAsync(null, cancellationToken).ConfigureAwait(false)).Dispose();
            }

    }
}
