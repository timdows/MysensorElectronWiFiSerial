import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { GatewayLog } from "app/_models/gatewayLog";
import { PayloadDescription } from "app/_models/payloadDescription";

@Injectable()
export class SerialDataService {

	data = Array<GatewayLog>();
	private subject = new Subject<any>();

	constructor() { }

	addData(data: string) {
		this.subject.next();
		this.createGetwayLog(data);
		// Use this to remove everyting after 30 elements in the array
		this.data.length = 30;
	}

	getAsObservable(): Observable<any> {
		return this.subject.asObservable();
	}

	getData() {
		return this.data;
	}

	private createGetwayLog(data: string) {
		var splitted = data.split(';');
		if (splitted.length === 6) {
			let payload = new PayloadDescription();

			let payloadSplitted = splitted[5].split(',');
			if (payloadSplitted.length === 11) {
				payload = new PayloadDescription({
					messageHeader: payloadSplitted[0],
					senderId: parseInt(payloadSplitted[1]),
					lastNodeId: parseInt(payloadSplitted[2]),
					destinationId: parseInt(payloadSplitted[3]),
					sensorId: parseInt(payloadSplitted[4]),
					command: parseInt(payloadSplitted[5]),
					messageType: parseInt(payloadSplitted[6]),
					payloadType: parseInt(payloadSplitted[7]),
					payloadLength: parseInt(payloadSplitted[8]),
					signing: parseInt(payloadSplitted[9]),
					payload: payloadSplitted[10],
				});
			}

			this.data.unshift(new GatewayLog({
				dateReceived: new Date(),
				nodeId: parseInt(splitted[0]),
				childSensorId: parseInt(splitted[1]),
				command: parseInt(splitted[2]),
				ack: parseInt(splitted[3]),
				type: parseInt(splitted[4]),
				payload: payload
			}));
		}
	}
}
