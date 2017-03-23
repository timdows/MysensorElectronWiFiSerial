import { Component, OnInit } from '@angular/core';
import { HttpService } from '../_services/index';

declare var d3: any;

@Component({
	selector: 'app-heating-stats',
	templateUrl: './heating-stats.component.pug',
	styleUrls: ['./heating-stats.component.scss']
})
export class HeatingStatsComponent implements OnInit {

	clientModel = {};

	options = {
		chart: {
			type: 'discreteBarChart',
			height: 450,
			margin: {
				top: 20,
				right: 20,
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
			xAxis: {
				axisLabel: 'X Axis'
			},
			yAxis: {
				axisLabel: 'Y Axis',
				axisLabelDistance: -10
			}
		}
	}

	data = [
		{
			key: "Cumulative Return",
			values: [
				{
					"label": "A",
					"value": -29.765957771107
				},
				{
					"label": "B",
					"value": 0
				},
				{
					"label": "C",
					"value": 32.807804682612
				},
				{
					"label": "D",
					"value": 196.45946739256
				},
				{
					"label": "E",
					"value": 0.19434030906893
				},
				{
					"label": "F",
					"value": -98.079782601442
				},
				{
					"label": "G",
					"value": -13.925743130903
				},
				{
					"label": "H",
					"value": -5.1387322875705
				}
			]
		}
	];

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
