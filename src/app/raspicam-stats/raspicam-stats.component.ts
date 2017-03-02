import { Component, OnInit, OnDestroy } from '@angular/core';
import { IpcService } from '../ipc.service';
import { EnvironmentService } from '../environment.service';
import { Observable, Subscription  } from 'rxjs/Rx';

@Component({
	selector: 'app-raspicam-stats',
	templateUrl: './raspicam-stats.component.html',
	styleUrls: ['./raspicam-stats.component.scss']
})
export class RaspicamStatsComponent implements OnInit, OnDestroy {

	ticks = 0;
	stats = {};
	
	private timer;
	private sub: Subscription;

	constructor(
		private environmentService: EnvironmentService,
		private ipcService: IpcService
	) { }

	ngOnInit() {
		this.timer = Observable.timer(0,5000);
		this.sub = this.timer.subscribe(t => this.timerTicks(t));

		this.ipcService.subscribeToEvent("set-raspicam-stats", this, this.handleSetRaspicamStats);
	}

	ngOnDestroy(){
		this.sub.unsubscribe();
		this.ipcService.removeAllListeners("set-raspicam-stats");
	}

	handleSetRaspicamStats(stats: any) {
		this.stats = stats;
		this.environmentService.detectChanges();
	}

	private timerTicks(tick){
		this.ticks = tick;
		this.getStats();
	}

	private getStats(){
		this.ipcService.getRaspicamStats();
	}
}
