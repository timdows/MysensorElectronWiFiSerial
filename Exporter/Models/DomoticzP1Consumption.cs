using System;

namespace Exporter.Models
{
	public class DomoticzP1Consumption
	{
		public string C1 { get; set; }
		public string C2 { get; set; }
		public string C3 { get; set; }
		public string C4 { get; set; }
		public string D { get; set; }
		public string R1 { get; set; }
		public string R2 { get; set; }
		public string V { get; set; }
		public string V2 { get; set; }

		public DateTime Date => DateTime.Parse(D);
		public double DayUsage => double.Parse(V) + double.Parse(V2);
	}
}
