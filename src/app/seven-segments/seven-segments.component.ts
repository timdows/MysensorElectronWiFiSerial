import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subscription } from 'rxjs/Rx';
import { Configuration } from "app/app.configuration";

@Component({
	selector: 'app-seven-segments',
	templateUrl: './seven-segments.component.pug',
	styleUrls: ['./seven-segments.component.scss']
})
export class SevenSegmentsComponent implements OnInit {
	ticks = 0;
	stats = {};
	debug = {};

	private timer;
	private sub: Subscription;

	constructor(
		private http: Http,
		private configuration: Configuration) { }

	ngOnInit() {
		this.timer = Observable.timer(0, 10000);
		this.sub = this.timer.subscribe(t => this.timerTicks(t));
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

	private timerTicks(tick) {
		this.ticks = tick;
		this.getStats();
	}

	private getStats() {
		this.http.get(`${this.configuration.ApiHost}/sevensegment/GetClientModel.json`)
			.subscribe(data => {
				this.stats = data.json();
			});
		//this.http.get(`${this.configuration.ApiHost}/sevensegment/GetDebugCacheData.json`)
		this.http.get(`${this.configuration.DomoticzHost}/json.htm?type=devices&rid=175`)
			.subscribe(data => {
				this.debug = data.json().result[0];
			});
	}

}
