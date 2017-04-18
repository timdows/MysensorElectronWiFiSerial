import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SerialDataService {

	data = Array<string>();
	private subject = new Subject<any>();

	constructor() { }
 
	addData(data: string) {
		this.subject.next();
		this.data.unshift(data);
		// Use this to remove everyting after 30 elements in the array
		this.data.length = 30;
	}

	getAsObservable(): Observable<any> {
		return this.subject.asObservable();
	}

	getData() {
		return this.data;
	}

}
