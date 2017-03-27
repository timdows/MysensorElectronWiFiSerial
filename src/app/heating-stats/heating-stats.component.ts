import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
//import { HttpService } from '../_services/index';

import { Configuration } from "../app.configuration";

declare var d3: any;

@Component({
	selector: 'app-heating-stats',
	templateUrl: './heating-stats.component.pug',
	styleUrls: ['./heating-stats.component.scss']
})
export class HeatingStatsComponent implements OnInit {

	clientModel = [];

	options = {
		chart: {
			type: 'multiBarChart',
			height: 450,
			margin: {
				top: 20,
				//right: 20,
				bottom: 50,
				left: 55
			},
			x: function (d) { return d.label; },
			y: function (d) { return d.value; },
			showValues: true,
			valueFormat: function (d) {
				return d3.format(',.4f')(d);
			},
			duration: 500,
			// xAxis: {
			// 	axisLabel: 'X Axis'
			// },
			yAxis: {
				axisLabel: 'Ticks',
				axisLabelDistance: -10
			}
		}
	}

	constructor(private http: Http, private configuration: Configuration) { }

	ngOnInit() {
		this.getClientModel();
	}

	private getClientModel() {
		this.http.get(`${this.configuration.ApiHost}heater/getclientmodel.json`)
			.subscribe(data => {
				this.clientModel = data.json();
			});
	}
}
