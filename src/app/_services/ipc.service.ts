import { Injectable } from '@angular/core';

declare var electron: any;

@Injectable()
export class IpcService {

	constructor() { }

	subscribeToEvent(name: string, thisArg: any, fn: any){
		electron.ipcRenderer.on(name, (event, arg) => {
			return fn.call(thisArg, arg);
		});
	}

	removeAllListeners(name: string) {
		electron.ipcRenderer.removeAllListeners(name);
	}

	getRaspicamStats() {
		electron.ipcRenderer.send("get-raspicam-stats");
	}

	getOsContent() {
		electron.ipcRenderer.send("get-os-content");
	}

	downloadDataMineDatabase(settings: any, apiProxyUrl: string) {
		electron.ipcRenderer.send("download-datamine-database", settings, apiProxyUrl);
	}

	closeApp() {
		electron.ipcRenderer.send("close-electron");
	}
}
