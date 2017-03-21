import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { IpcService } from '../ipc.service';
import { EnvironmentService } from '../environment.service';

@Component({
	selector: 'app-side-menu',
	templateUrl: './side-menu.component.pug',
	styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

	info = {};
	ipAddressInfo = [];
	isOpenAside = true;

	constructor(
		private ipcService: IpcService,
		private environmentService: EnvironmentService,
		private changeDetectorRef: ChangeDetectorRef,
		private router: Router) { }

	ngOnInit() {
		setTimeout(() => {
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

	handleSetOsContent(info: any) {	
		this.info = info;
		this.ipAddressInfo = [];
		
		Object.keys(info.networkInterfaces).forEach((ifname) => {
			var alias = 0;
			info.networkInterfaces[ifname].forEach((iface) => {
				if ('IPv4' !== iface.family || iface.internal !== false) {
					// skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
					return;
				}

				if (alias >= 1) {
					// this single interface has multiple ipv4 addresses
					console.log("This single interface has multiple ipv4 addresses", ifname + ':' + alias, iface.address);
				} else {
					// this interface has only one ipv4 adress
					//console.log(ifname, iface.address);
					this.ipAddressInfo.push({
						name: ifname,
						address: iface.address
					});
				}
				++alias;
			});
		});

		this.changeDetectorRef.detectChanges();
	}

	clickCloseApp() {
		this.ipcService.closeApp();
	}
}
