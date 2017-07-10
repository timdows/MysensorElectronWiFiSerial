import { Injectable, Inject, forwardRef } from '@angular/core';
import { SerialDataService, VeraExportService, DomoticzExportService } from 'app/_services/index';

declare var electron: any;

@Injectable()
export class IpcService {

	constructor(
		private serialDataService: SerialDataService,
		@Inject(forwardRef(() => VeraExportService)) private veraExportService: VeraExportService,
		private domoticzExportService: DomoticzExportService) {
		this.init();
	}

	subscribeToEvent(name: string, thisArg: any, fn: any) {
		electron.ipcRenderer.on(name, (event, arg) => {
			return fn.call(thisArg, arg);
		});
	}

	init() {
		// Use timeout to make sure that electron is available
		setTimeout(() => {
			// Push
			this.subscribeToEvent("push-serialdata", this, this.handlePushSerialData);

			// Executors
			this.subscribeToEvent("execute-vera-database-export", this, this.handleExecuteVeraDatabaseExport);
			this.subscribeToEvent("execute-vera-values-export", this, this.handleExecuteVeraValuesExport);
			this.subscribeToEvent("execute-domoticz-values-export", this, this.handleExecuteDomoticzValuesExport);

			// Receivers
			this.subscribeToEvent("receive-vera-export-values", this, this.handleReceiveVeraExportValues);
			this.subscribeToEvent("receive-vera-watt-value", this, this.handleReceiveVeraWattValue);
			this.subscribeToEvent("receive-domoticz-watt-value", this, this.handleReceiveDomoticzWattValue);

		}, 0);
	}

	// Requests
	removeAllListeners(name: string) {
		electron.ipcRenderer.removeAllListeners(name);
	}

	getRaspicamStats(settings: any) {
		electron.ipcRenderer.send("get-raspicam-stats", settings);
	}

	getOsContent() {
		electron.ipcRenderer.send("get-os-content");
	}

	downloadDataMineDatabase(settings: any) {
		electron.ipcRenderer.send("download-datamine-database", settings);
	}

	getVera3Stats(settings: any) {
		electron.ipcRenderer.send("get-vera3-stats", settings);
	}

	getHttpResponse(host, port, path, ipcName) {
		electron.ipcRenderer.send("get-http-response", host, port, path, ipcName);
	}

	closeApp() {
		electron.ipcRenderer.send("close-electron");
	}

	// Handlers
	handlePushSerialData(data: string) {
		this.serialDataService.addData(data);
	}

	handleExecuteVeraDatabaseExport() {
		this.veraExportService.exportDatabase();
	}

	handleExecuteVeraValuesExport() {
		this.veraExportService.exportValues();
	}

	handleExecuteDomoticzValuesExport() {
		this.domoticzExportService.exportValues();
	}

	handleReceiveVeraExportValues(data: any) {
		this.veraExportService.receiveVeraExportValues(data);
	}

	handleReceiveVeraWattValue(data: any) {
		this.veraExportService.receiveVeraWattValue(data);
	}

	handleReceiveDomoticzWattValue(data: any) {
		this.domoticzExportService.receiveDomoticzWattValue(data);
	}
}
