import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EnvironmentService, IpcService, VeraExportService } from "app/_services";
import { Http } from "@angular/http";
import { Configuration } from "app/app.configuration";

@Component({
	selector: 'app-vera3-stats',
	templateUrl: './vera3-stats.component.pug',
	styleUrls: ['./vera3-stats.component.scss']
})
export class Vera3StatsComponent implements OnInit {

	private settings: any;
	stats: any;

	constructor(
		private environmentService: EnvironmentService,
		private changeDetectorRef: ChangeDetectorRef,
		private ipcService: IpcService,
		private http: Http,
		private configuration: Configuration,
		private veraExportService: VeraExportService) { }

	ngOnInit() {
		this.ipcService.subscribeToEvent("set-vera3-stats", this, this.handleSetVera3Stats);
		this.getStats();
	}

	ngOnDestroy() {
		this.ipcService.removeAllListeners("set-vera3-stats");
	}

	exportDatabaseManually() {
		this.veraExportService.exportDatabase();
	}

	handleSetVera3Stats(stats: any) {
		this.stats = stats;
		this.changeDetectorRef.detectChanges();
	}

	private getStats() {
		console.log("Vera3StatsComponent getStats");
		this.http.get(`${this.configuration.ApiHost}settings/getverasettings.json`)
			.subscribe((data) => {
				this.settings = data.json();
				this.ipcService.getVera3Stats(this.settings);
			});
	}
}
