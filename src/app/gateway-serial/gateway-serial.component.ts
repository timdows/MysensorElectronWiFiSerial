import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SerialDataService } from '../serial-data.service';

@Component({
	selector: 'app-gateway-serial',
	templateUrl: './gateway-serial.component.pug',
	styleUrls: ['./gateway-serial.component.css']
})
export class GatewaySerialComponent implements OnInit {
	
	subscription: Subscription;
	data = [];

	constructor(
		private changeDetectorRef: ChangeDetectorRef,
		private serialDataService: SerialDataService) { }

	ngOnInit() {
		this.subscription = this.serialDataService
			.getAsObservable()
			.subscribe(() => { 
				this.data = this.serialDataService.getData();
				this.changeDetectorRef.detectChanges();
			});
	}
}
