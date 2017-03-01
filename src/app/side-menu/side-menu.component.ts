import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IpcService } from '../ipc.service';
import { EnvironmentService } from '../environment.service';

//declare var electron: any;

@Component({
	selector: 'app-side-menu',
	templateUrl: './side-menu.component.pug',
	styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
	isOpenAside = true;

	constructor(
		private ipcService: IpcService,
		private environmentService: EnvironmentService, 
		private router: Router) { }

	ngOnInit() {
		setTimeout(() => {
			//this.ipcService.subscribeToEvent("set-os-cpu-stats", this, this.handleSetOsCpuStats);
			//this.ipcService.getOsCpuStats();

			this.ipcService.subscribeToEvent("set-os-content", this, this.handleSetOsContent);
			this.ipcService.getOsContent();
		}, 0);
	}

	changeRoute(type: string){
		this.router.navigate(["/" + type]);
	}

	toggleAside(){
		if (this.isOpenAside) {
			this.environmentService.removeClassOnHtml("aside-open");
		}
		else {
			this.environmentService.addClassOnHtml("aside-open");
		}

		this.isOpenAside = !this.isOpenAside;
	}

	handleSetOsCpuStats(stats: any) {
		console.log("handleSetOsCpuStats", stats);
	}

	handleSetOsContent(stats: any) {
		console.log("handleSetOsContent", stats);
	}
}
