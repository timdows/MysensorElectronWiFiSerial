import { Component, Inject, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { IpcService, EnvironmentService } from '../_services/index';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { Subscription } from "rxjs/Subscription";

@Component({
	selector: 'app-side-menu',
	templateUrl: './side-menu.component.pug',
	styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit, OnDestroy {

	info = {};
	ipAddressInfo = [];
	isOpenAside = true;

	private subscription: Subscription;
	timeString = new Date().toLocaleTimeString();

	constructor(
		private ipcService: IpcService,
		private environmentService: EnvironmentService,
		private changeDetectorRef: ChangeDetectorRef,
		private router: Router) { }

	ngOnInit() {
		let timer = TimerObservable.create(2000, 1000);
		this.subscription = timer.subscribe(t => {
			this.timeString = new Date().toLocaleTimeString();
		});

		setTimeout(() => {
			this.ipcService.subscribeToEvent("set-os-content", this, this.handleSetOsContent);
			this.ipcService.getOsContent();
		}, 0);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	changeRoute(type: string) {
		this.router.navigate(["/" + type]);
	}

	toggleAside() {
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
