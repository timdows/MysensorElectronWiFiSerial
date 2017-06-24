import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subscription  } from 'rxjs/Rx';

import { IpcService, EnvironmentService } from '../_services/index';
import { Configuration } from "app/app.configuration";

@Component({
	selector: 'app-raspicam-stats',
	templateUrl: './raspicam-stats.component.pug',
	styleUrls: ['./raspicam-stats.component.scss']
})
export class RaspicamStatsComponent implements OnInit, OnDestroy {

	ticks = 0;
	raspicamStats = {};
	synologyStats = {};

	private timer;
	private sub: Subscription;
	private raspicamSettings: any = null;

	constructor(
		private environmentService: EnvironmentService,
		private changeDetectorRef: ChangeDetectorRef,
		private ipcService: IpcService,
		private http: Http,
		private configuration: Configuration
	) { }

	ngOnInit() {
		this.timer = Observable.timer(0,20000);
		this.sub = this.timer.subscribe(t => this.timerTicks(t));

		this.ipcService.subscribeToEvent("set-raspicam-stats", this, this.handleSetRaspicamStats);

		this.http.get(`${this.configuration.ApiHost}settings/getraspicamsettings.json`)
			.subscribe(data => {
				this.raspicamSettings = data.json();
			});
	}

	ngOnDestroy(){
		this.sub.unsubscribe();
		this.ipcService.removeAllListeners("set-raspicam-stats");
	}

	handleSetRaspicamStats(stats: any) {
		this.raspicamStats = stats;
		this.changeDetectorRef.detectChanges();
	}

	private timerTicks(tick){
		this.ticks = tick;
		this.getStats();
	}

	private getStats(){
		if (this.raspicamSettings === null) {
			return;
		}

		//this.ipcService.getRaspicamStats(this.raspicamSettings);

		if (this.ticks % 3 === 0) {
			this.http.get(`${this.configuration.SynologyHost}stats/index.php?forexport`)
				.subscribe(data => {
					this.synologyStats = data.json();
				});
		}
	}
}
