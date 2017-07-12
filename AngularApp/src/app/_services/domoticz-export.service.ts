import { Injectable, Inject, forwardRef, Injector } from '@angular/core';
import { Http } from "@angular/http";
import { Observable, Subscription } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { Configuration } from "app/app.configuration";
import { IpcService } from "app/_services";

@Injectable()
export class DomoticzExportService {

	private ipcService: IpcService;

	private domoticzSettings: any = null;

	constructor(
		private injector: Injector,
		private http: Http,
		private configuration: Configuration//,
		//@Inject(forwardRef(() => IpcService)) private ipcService: IpcService
		) {
		setTimeout(() => {
			this.ipcService = injector.get(IpcService);
			this.init();
		}, 0);
	}

	// Export the raw database
	exportDatabase() {
		//console.log("VeraExportService exportDatabase");
		//this.ipcService.downloadDataMineDatabase(this.veraSettings);
	}

	// Export values from Domoticz
	exportValues() {

		// this.ipcService.getHttpResponse(
		// 	this.veraSettings.veraIpAddress,
		// 	`/port_3480/data_request?id=lr_dmData&start=${--epochStart}&stop=${++epochStop}&channel1=${this.powerImport1.dataMineChannel}`,
		// 	"receive-vera-export-values");

		// this.ipcService.getHttpResponse(
		// 	this.veraSettings.veraIpAddress,
		// 	`/port_3480/data_request?id=lr_dmData&start=${--epochStart}&stop=${++epochStop}&channel1=${this.powerImport2.dataMineChannel}`,
		// 	"receive-vera-export-values");

		// // Get current wattage
		// this.ipcService.getHttpResponse(
		// 	this.veraSettings.veraIpAddress,
		// 	`/port_3480/data_request?id=status&output_format=json&DeviceNum=${this.veraSettings.wattChannel}`,
		// 	"receive-vera-watt-value");
		// Get current wattage
		// this.ipcService.getHttpResponse(
		// 	this.domoticzSettings.host,
		// 	this.domoticzSettings.port,
		// 	`json.htm?type=devices&rid=${this.domoticzSettings.wattIdx}`,
		// 	"receive-domoticz-watt-value");
	}

	// Receives the watt json object from domoticz via IPC
	receiveDomoticzWattValue(data: any) {
		let watt = data.result[0].Usage.replace(" Watt", "");
		console.log(watt);
		let formData = new FormData();
		// Get the pure watt value from the json object
		formData.append('wattValue', watt);

		this.http.post(`${this.configuration.ApiHost}SevenSegment/InsertCurrentWattValue`, formData)
			.subscribe(() => {});
	}

	private init() {
		this.http.get(`${this.configuration.ApiHost}settings/getdomoticzsettings.json`)
			.subscribe(data => {
				this.domoticzSettings = data.json();
			});
	}
}
