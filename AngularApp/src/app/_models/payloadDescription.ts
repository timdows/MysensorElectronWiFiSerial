export class PayloadDescription {
	messageHeader: string;
	senderId: number;
	lastNodeId: number;
	destinationId: number;
	sensorId: number;
	command: number;
	messageType: number;
	payloadType: number;
	payloadLength: number;
	signing: number;
	payload: string;

	constructor (init?:Partial<PayloadDescription>) {
		Object.assign(this, init);
	}
}