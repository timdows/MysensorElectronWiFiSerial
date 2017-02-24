import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
	selector: 'app-pihole-stats',
	templateUrl: './pihole-stats.component.pug',
	styleUrls: ['./pihole-stats.component.css']
})
export class PiholeStatsComponent implements OnInit {

	stats = {};

	constructor(private http: Http) { }

	ngOnInit() {
		this.getSummary();
	}

	private getSummary(){
		this.http.get("http://10.0.0.8/admin/api.php?summary")
			.subscribe(data => {
				this.stats = data.json();
				setTimeout(() =>{
					this.getSummary();
				}, 2500);
			});
	}
}
