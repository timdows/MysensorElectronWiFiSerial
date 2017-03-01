import { Injectable } from '@angular/core';

declare var electron: any;

@Injectable()
export class IpcService {

	constructor() { }

	subscribeToEvent(name: string, thisArg: any, fn: any){
		electron.ipcRenderer.on(name, (event, arg) => {
			console.log(name, arg);
			return fn.call(thisArg, arg);
		});
	}

	getRaspicamStats() {
		electron.ipcRenderer.send("get-raspicam-stats", "s");
	}

	getOsCpuStats() {
		console.log("Angular getOsCpuStats");
		electron.ipcRenderer.send("get-os-cpu-stats", "s");
	}

	getOsContent() {
		electron.ipcRenderer.send("get-os-content");
	}
}
