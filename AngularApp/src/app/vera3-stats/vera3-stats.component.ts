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
	localVera3Stats: any;
	exportFileStats: any;
	showExportButton: boolean = true;

	constructor(
		private environmentService: EnvironmentService,
		private changeDetectorRef: ChangeDetectorRef,
		private ipcService: IpcService,
		private http: Http,
		private configuration: Configuration,
		private veraExportService: VeraExportService) { }

	ngOnInit() {
		this.ipcService.subscribeToEvent("set-vera3-stats", this, this.handleSetVera3Stats);
		this.getLocalVera3Stats();
		this.getExportFileStats();
	}

	ngOnDestroy() {
		this.ipcService.removeAllListeners("set-vera3-stats");
	}

	exportDatabaseManually() {
		this.showExportButton = false;
		this.veraExportService.exportDatabase();
	}

	handleSetVera3Stats(localVera3Stats: any) {
		this.localVera3Stats = localVera3Stats;
		this.changeDetectorRef.detectChanges();
	}

	// Stats from the vera3 at home
	private getLocalVera3Stats() {
		this.http.get(`${this.configuration.ApiHost}settings/getverasettings.json`)
			.subscribe((data) => {
				this.settings = data.json();
				this.ipcService.getVera3Stats(this.settings);
			});
	}

	// Information about the latest 10 exports
	private getExportFileStats() {
		this.http.get(`${this.configuration.ApiHost}veraexport/GetExportFileStats.json`)
			.subscribe((data) => {
				this.exportFileStats = data.json();
			});
	}
}
