import { Injectable } from '@angular/core';
import {Http, XHRBackend, 
	Request, RequestOptionsArgs, 
	Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/catch";

import { Configuration } from "../app.configuration";

@Injectable()
export class HttpService extends Http {

	constructor(
		backend: XHRBackend,
		options: RequestOptions,
		private configuration: Configuration) { 
			super(backend, options);
		}

	request(url: string|Request, options?: RequestOptionsArgs): Observable<any> {
		// if (typeof url === 'string' || url instanceof String) {
		// 	url = `${this.configuration.ApiProxyUrl}${url}`;
		// }
		// else {
		// 	url.url = `${this.configuration.ApiProxyUrl}${url.url}`;
		// }

		return super.request(url, options).catch(this.catchAuthError(this));
	}

	private catchAuthError(self: HttpService) {
		// we have to pass HttpService's own instance here as self
		return (res: Response) => {
			switch (res.status) {
			case 400: //Returned if the URL entered incorrectly
				console.log("400 fout opgetreden");
				break;
			case 401:
				console.log("401 fout opgetreden");
				break;
			case 403: //Returned if the currently authenticated user does not have permission to view it.
				console.log("403 fout opgetreden");
				break;
			case 404: //Returned if the URL entered incorrectly
				console.log("404 fout opgetreden");
				break;
			}

			return Observable.empty();
		};
	}
}
