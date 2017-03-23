import { Component, OnInit } from '@angular/core';
import { HttpService } from '../_services/index';

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

	constructor(private httpService: HttpService) { }

	ngOnInit() {
		this.getClientModel();
	}

	private getClientModel() {
		this.httpService.get("http://localhost:5002/heater/getclientmodel.json")
			.subscribe(data => {
				this.clientModel = data.json();
			});
	}
}
