import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subscription  } from 'rxjs/Rx';

@Component({
	selector: 'app-seven-segments',
	templateUrl: './seven-segments.component.pug',
	styleUrls: ['./seven-segments.component.scss']
})
export class SevenSegmentsComponent implements OnInit {
	ticks = 0;
	stats = {};
	
	private timer;
	private sub: Subscription;

	constructor(private http: Http) { }

	ngOnInit() {
		this.timer = Observable.timer(0,10000);
		this.sub = this.timer.subscribe(t => this.timerTicks(t));
	}

	ngOnDestroy(){
		this.sub.unsubscribe();
	}

	private timerTicks(tick){
		this.ticks = tick;
		this.getStats();
	}

	private getStats(){
		this.http.get("http://10.0.0.5/api/vera/sevensegment")
			.subscribe(data => {
				this.stats = data.json();
			});
	}

}
