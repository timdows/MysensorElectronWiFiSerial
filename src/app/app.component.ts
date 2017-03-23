import { Component, OnInit } from '@angular/core';

import { IpcService, SerialDataService, VeraExportService } from './_services/index';

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
			this.ipcService.subscribeToEvent("push-serialdata", this, this.handlePushSerialData);
			this.ipcService.subscribeToEvent("execute-vera-export", this, this.handleExecuteVeraExport);
		}, 0);
	}

	handlePushSerialData(data: string) {	
		this.serialDataService.addData(data);
	}

	handleExecuteVeraExport() {
		this.veraExportService.run();
	}
}
