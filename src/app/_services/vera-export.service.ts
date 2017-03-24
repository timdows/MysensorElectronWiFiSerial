import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { Configuration } from "../app.configuration";
import { IpcService } from "../_services";

@Injectable()
export class VeraExportService {

	private settings: any;

	constructor(
		private http: Http, 
		private configuration: Configuration,
		private ipcService: IpcService) { }

	export() {
		console.log("veraexportservice run");
		this.http.get(`${this.configuration.ApiProxyUrl}http://localhost:5002/settings/getverasettings.json`)
			.subscribe((data) => {
				this.settings = data.json();
				this.ipcService.downloadDataMineDatabase(this.settings, this.configuration.ApiProxyUrl);
			});
	}
}
