import { Component, OnInit, OnDestroy } from '@angular/core';
import { IpcService } from '../ipc.service';

import { EnvironmentService } from '../environment.service';

@Component({
	selector: 'app-raspicam-stats',
	templateUrl: './raspicam-stats.component.html',
	styleUrls: ['./raspicam-stats.component.scss']
})
export class RaspicamStatsComponent implements OnInit, OnDestroy {

	stats = {};

	constructor(
		private environmentService: EnvironmentService,
		private ipcService: IpcService
	) { }

	ngOnInit() {
		this.ipcService.subscribeToEvent("set-raspicam-stats", this, this.handleSetRaspicamStats);
		this.ipcService.getRaspicamStats();
	}

	ngOnDestroy(){
		// TODO[TT] find out if needed
		//this.changeDetectorRef.detach();
		//electron.ipcRenderer.removeAllListeners("set-raspicam-stats");
		this.ipcService.removeAllListeners("set-raspicam-stats");
	}

	handleSetRaspicamStats(stats: any) {
		this.stats = stats;
		this.environmentService.detectChanges();
	}
}
