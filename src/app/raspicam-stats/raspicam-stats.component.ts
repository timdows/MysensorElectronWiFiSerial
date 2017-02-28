import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

declare var electron: any;

@Component({
	selector: 'app-raspicam-stats',
	templateUrl: './raspicam-stats.component.html',
	styleUrls: ['./raspicam-stats.component.scss']
})
export class RaspicamStatsComponent implements OnInit, OnDestroy {

	stats = {};

	constructor(private changeDetectorRef: ChangeDetectorRef) { }

	ngOnInit() {
		this.subscribe();
		electron.ipcRenderer.send("get-raspicam-stats", "content123");
	}

	ngOnDestroy(){
		this.changeDetectorRef.detach();
		electron.ipcRenderer.removeAllListeners("set-raspicam-stats");
	}

	subscribe(){
		electron.ipcRenderer.on("set-raspicam-stats", (event, arg) => {
			this.stats = arg;
			console.log("set-raspicam-stats");
			this.changeDetectorRef.detectChanges();
		});
	}
}
