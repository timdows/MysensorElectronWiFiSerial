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

	getHttpResponse(host, path, ipcName) {
		electron.ipcRenderer.send("get-http-response", host, path, ipcName);
	}

	closeApp() {
		electron.ipcRenderer.send("close-electron");
	}
}
