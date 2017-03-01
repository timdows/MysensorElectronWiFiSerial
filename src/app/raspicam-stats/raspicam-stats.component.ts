import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { IpcService } from '../ipc.service';

declare var electron: any;

@Component({
	selector: 'app-raspicam-stats',
	templateUrl: './raspicam-stats.component.html',
	styleUrls: ['./raspicam-stats.component.scss']
})
export class RaspicamStatsComponent implements OnInit, OnDestroy {

	stats = {};

	constructor(
		private changeDetectorRef: ChangeDetectorRef,
		private ipcService: IpcService
	) { }

	ngOnInit() {
		this.ipcService.subscribeToEvent("set-raspicam-stats", this, this.handleSetRaspicamStats);
		this.ipcService.getRaspicamStats();
	}

	ngOnDestroy(){
		this.changeDetectorRef.detach();
		electron.ipcRenderer.removeAllListeners("set-raspicam-stats");
	}

	handleSetRaspicamStats(stats: any) {
		this.stats = stats;
		this.changeDetectorRef.detectChanges();
	}
}
