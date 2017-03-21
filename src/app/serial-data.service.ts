import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SerialDataService {

	data = new Array(1000);
	private subject = new Subject<any>();

	constructor() { }
 
	addData(data: string) {
		this.subject.next();
		this.data.unshift(data);
	}

	getAsObservable(): Observable<any> {
		return this.subject.asObservable();
	}

	getData() {
		return this.data;
	}

}
