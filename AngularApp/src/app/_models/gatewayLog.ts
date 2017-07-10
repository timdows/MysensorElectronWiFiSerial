import { PayloadDescription } from "app/_models/payloadDescription";

export class GatewayLog {
	dateReceived: Date;

	nodeId: number;
	childSensorId: number;
	command: number;
	ack: number;
	type: number;
	payload: PayloadDescription;

	constructor (init?:Partial<GatewayLog>) {
		Object.assign(this, init);
	}
}