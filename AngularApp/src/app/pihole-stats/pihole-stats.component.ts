import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subscription } from 'rxjs/Rx';
import { Configuration } from "app/app.configuration";

@Component({
	selector: 'app-pihole-stats',
	templateUrl: './pihole-stats.component.pug',
	styleUrls: ['./pihole-stats.component.scss']
})
export class PiholeStatsComponent implements OnInit, OnDestroy {
	ticks = 0;
	stats = {};
	
	private timer;
	private sub: Subscription;

	constructor(private http: Http,
		private configuration: Configuration) { }

	ngOnInit() {
		this.timer = Observable.timer(0,5000);
		this.sub = this.timer.subscribe(t => this.timerTicks(t));
	}

	ngOnDestroy(){
		this.sub.unsubscribe();
	}

	private timerTicks(tick){
		this.ticks = tick;
		this.getSummary();
	}

	private getSummary(){
		this.http.get(`${this.configuration.PiholeHost}admin/api.php?summary`)
			.subscribe(data => {
				this.stats = data.json();
			});
	}
}
