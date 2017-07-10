import { Injectable, Inject, forwardRef, Injector } from '@angular/core';
import { Http } from "@angular/http";
import { Observable, Subscription } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { Configuration } from "app/app.configuration";
import { IpcService } from "app/_services";

@Injectable()
export class VeraExportService {

	private ipcService: IpcService;

	private veraSettings: any = null;
	private dataMineSettings: any;
	private powerImport1: any;
	private powerImport2: any;

	private count: number = -1;

	constructor(
		private injector: Injector,
		private http: Http,
		private configuration: Configuration
		//@Inject(forwardRef(() => IpcService)) private ipcService: IpcService) {
	) {
		setTimeout(() => {
			this.ipcService = injector.get(IpcService);
			this.init();
		}, 0);
	}

	// Export the raw database
	exportDatabase() {
		console.log("VeraExportService exportDatabase");
		this.ipcService.downloadDataMineDatabase(this.veraSettings);
	}

	// Export values from vera3
	exportValues() {
		if (this.veraSettings === null) {
			return;
		}

		// Get stats over the full day, as this takes a while we only get these every 5 minutes
		if (this.count === -1 || ++this.count >= 30) {
			this.count = 0;

			var today = new Date();
			today.setHours(0, 0, 0, 0);
			var epochStart = today.getTime() / 1000;
			var epochStop = epochStart + 86400;

			this.ipcService.getHttpResponse(
				this.veraSettings.veraIpAddress,
				80,
				`/port_3480/data_request?id=lr_dmData&start=${--epochStart}&stop=${++epochStop}&channel1=${this.powerImport1.dataMineChannel}`,
				"receive-vera-export-values");

			this.ipcService.getHttpResponse(
				this.veraSettings.veraIpAddress,
				80,
				`/port_3480/data_request?id=lr_dmData&start=${--epochStart}&stop=${++epochStop}&channel1=${this.powerImport2.dataMineChannel}`,
				"receive-vera-export-values");
		}

		// Get current wattage
		this.ipcService.getHttpResponse(
			this.veraSettings.veraIpAddress,
			80,
			`/port_3480/data_request?id=status&output_format=json&DeviceNum=${this.veraSettings.wattChannel}`,
			"receive-vera-watt-value");
	}

	// Receives the powermeter KWH for json object from the vera3 via IPC
	receiveVeraExportValues(data: any) {
		console.log("receiveVeraExportValues", data);

		let formData = new FormData();
		formData.append('label', data["series"][0]["label"]);
		formData.append('min', data["series"][0]["min"]);
		formData.append('max', data["series"][0]["max"]);

		this.http.post(`${this.configuration.ApiHost}SevenSegment/InsertCurrentPowerImportValue`, formData)
			.subscribe(() => {
			});
	}

	// Receives the watt json object from the vera3 via IPC
	receiveVeraWattValue(data: any) {
		let formData = new FormData();
		// Get the pure watt value from the json object
		formData.append('wattValue', data[`Device_Num_${this.veraSettings.wattChannel}`]["states"][0]["value"]);

		this.http.post(`${this.configuration.ApiHost}SevenSegment/InsertCurrentWattValue`, formData)
			.subscribe(() => {
			});
	}

	private init() {
		this.http.get(`${this.configuration.ApiHost}settings/getverasettings.json`)
			.subscribe(data => {
				this.veraSettings = data.json();
			});
		this.http.get(`${this.configuration.ApiHost}settings/getdataminesettings.json`)
			.subscribe(data => {
				this.dataMineSettings = data.json();

				this.http.get(`${this.configuration.ApiHost}device/getdevice.json?deviceId=${this.dataMineSettings.powerImport1Channel}`)
					.subscribe(data => {
						this.powerImport1 = data.json();
					});
				this.http.get(`${this.configuration.ApiHost}device/getdevice.json?deviceId=${this.dataMineSettings.powerImport2Channel}`)
					.subscribe(data => {
						this.powerImport2 = data.json();
					});
			});
	}
}
