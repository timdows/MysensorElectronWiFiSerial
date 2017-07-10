import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule, RequestOptions, XHRBackend } from "@angular/http";

import { NvD3Module } from 'angular2-nvd3-aot';

import { Configuration } from './app.configuration';
import { HttpService, IpcService, EnvironmentService, SerialDataService, VeraExportService, DomoticzExportService } from './_services/index';

import { AppComponent } from './app.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { GatewaySerialComponent } from './gateway-serial/gateway-serial.component';
import { Nrf24SnifferComponent } from './nrf24-sniffer/nrf24-sniffer.component';
import { PiholeStatsComponent } from './pihole-stats/pihole-stats.component';
import { SevenSegmentsComponent } from './seven-segments/seven-segments.component';
import { RaspicamStatsComponent } from './raspicam-stats/raspicam-stats.component';
import { HeatingStatsComponent } from './heating-stats/heating-stats.component';
import { Vera3StatsComponent } from './vera3-stats/vera3-stats.component';

// export function httpServiceFactory(backend: XHRBackend, options: RequestOptions, configuration: Configuration) {
// 	return new HttpService(backend, options, configuration);
// }

export function ipcServiceFactory(serialDataService: SerialDataService, veraExportService: VeraExportService, domoticzExportService: DomoticzExportService) {
	return new IpcService(serialDataService, veraExportService, domoticzExportService);
}

const appRoutes: Routes = [
	{ path: 'gateway-serial', component: GatewaySerialComponent },
	{ path: 'nrf24-sniffer', component: Nrf24SnifferComponent },
	{ path: 'pihole-stats', component: PiholeStatsComponent },
	{ path: 'seven-segments', component: SevenSegmentsComponent },
	{ path: 'raspicam-stats', component: RaspicamStatsComponent },
	{ path: 'heating-stats', component: HeatingStatsComponent },
	{ path: 'vera3-stats', component: Vera3StatsComponent },
	{
		path: '',
		redirectTo: '/gateway-serial',
		pathMatch: 'full'
	},
	//{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
	declarations: [
		AppComponent,
		SideMenuComponent,
		GatewaySerialComponent,
		Nrf24SnifferComponent,
		PiholeStatsComponent,
		SevenSegmentsComponent,
		RaspicamStatsComponent,
		HeatingStatsComponent,
		Vera3StatsComponent
	],
	imports: [
		RouterModule.forRoot(appRoutes),
		BrowserModule,
		FormsModule,
		HttpModule,
		NvD3Module
	],
	providers: [
		// {
		// 	provide: HttpService,
		// 	useFactory: httpServiceFactory,
		// 	deps: [XHRBackend, RequestOptions, Configuration]
		// },
		Configuration,
		//IpcService,
		EnvironmentService,
		SerialDataService,
		VeraExportService,
		DomoticzExportService,
		{
			provide: IpcService,
			useFactory: ipcServiceFactory,
			deps: [SerialDataService, VeraExportService, DomoticzExportService]
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
