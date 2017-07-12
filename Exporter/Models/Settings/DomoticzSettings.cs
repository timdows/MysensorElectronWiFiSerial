namespace Exporter.Models.Settings
{
    public class DomoticzSettings
    {
        public string Host { get; set; }
        public int Port { get; set; }
        public int WattIdx { get; set; } // IDX to get the current Watt from smart meter from
    }
}