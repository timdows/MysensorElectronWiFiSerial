import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IpcService } from './ipc.service';

@Component({
	selector: 'mysensor-electron-wifi-serial',
	templateUrl: './app.component.pug',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	data = [];

	constructor(
		private ipcService: IpcService,
		private changeDetectorRef: ChangeDetectorRef) { }

	ngOnInit() {
		this.ipcService.subscribeToEvent("push-serialdata", this, this.handlePushSerialData);
	}

	handlePushSerialData(data: any) {	
		this.data.push(data);

		//this.changeDetectorRef.detectChanges();
	}
}
