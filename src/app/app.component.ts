import { Component, OnInit } from '@angular/core';

import { IpcService } from './ipc.service';
import { SerialDataService } from './serial-data.service';

@Component({
	selector: 'mysensor-electron-wifi-serial',
	templateUrl: './app.component.pug',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	constructor(
		private ipcService: IpcService,
		private serialDataService: SerialDataService) { }

	ngOnInit() {
		setTimeout(() => {
			this.ipcService.subscribeToEvent("push-serialdata", this, this.handlePushSerialData);
		}, 0);
	}

	handlePushSerialData(data: string) {	
		this.serialDataService.addData(data);
	}
}
