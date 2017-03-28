import { Component, OnInit } from '@angular/core';
import { IpcService, SerialDataService, VeraExportService } from 'app/_services/index';

@Component({
	selector: 'mysensor-electron-wifi-serial',
	templateUrl: './app.component.pug',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	constructor(
		private ipcService: IpcService,
		private serialDataService: SerialDataService,
		private veraExportService: VeraExportService) { }

	ngOnInit() {
		setTimeout(() => {
			// Push
			this.ipcService.subscribeToEvent("push-serialdata", this, this.handlePushSerialData);

			// Executors
			this.ipcService.subscribeToEvent("execute-vera-database-export", this, this.handleExecuteVeraDatabaseExport);
			this.ipcService.subscribeToEvent("execute-vera-values-export", this, this.handleExecuteVeraValuesExport);
			
			// Receivers
			this.ipcService.subscribeToEvent("receive-vera-export-values", this, this.handleReceiveVeraExportValues);
			this.ipcService.subscribeToEvent("receive-vera-watt-value", this, this.handleReceiveVeraWattValue);
			
		}, 0);
	}

	handlePushSerialData(data: string) {	
		this.serialDataService.addData(data);
	}

	handleExecuteVeraDatabaseExport() {
		this.veraExportService.exportDatabase();
	}

	handleExecuteVeraValuesExport() {
		this.veraExportService.exportValues();
	}

	handleReceiveVeraExportValues(data: any) {
		this.veraExportService.receiveVeraExportValues(data);
	}

	handleReceiveVeraWattValue(data: any) {
		this.veraExportService.receiveVeraWattValue(data);
	}
}