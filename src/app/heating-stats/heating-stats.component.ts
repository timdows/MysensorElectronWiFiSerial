import { Component, OnInit } from '@angular/core';
import { HttpService } from '../_services/index';

@Component({
	selector: 'app-heating-stats',
	templateUrl: './heating-stats.component.pug',
	styleUrls: ['./heating-stats.component.scss']
})
export class HeatingStatsComponent implements OnInit {

	clientModel = {};

	constructor(private httpService: HttpService) { }

	ngOnInit() {
		this.getClientModel();
	}

	private getClientModel() {
		this.httpService.get("http://localhost:5002/heater/getclientmodel.json?heaterMeterGroupID=1")
			.subscribe(data => {
				this.clientModel = data.json();
			});
	}
}
