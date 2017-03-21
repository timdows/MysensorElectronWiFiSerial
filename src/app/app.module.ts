import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ButtonModule } from 'primeng/primeng';

import { IpcService } from './ipc.service';
import { EnvironmentService } from './environment.service';
import { SerialDataService } from './serial-data.service';

import { AppComponent } from './app.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { GatewaySerialComponent } from './gateway-serial/gateway-serial.component';
import { Nrf24SnifferComponent } from './nrf24-sniffer/nrf24-sniffer.component';
import { PiholeStatsComponent } from './pihole-stats/pihole-stats.component';
import { SevenSegmentsComponent } from './seven-segments/seven-segments.component';
import { RaspicamStatsComponent } from './raspicam-stats/raspicam-stats.component';
import { HeatingStatsComponent } from './heating-stats/heating-stats.component';

const appRoutes: Routes = [
	{ path: 'gateway-serial', component: GatewaySerialComponent },
	{ path: 'nrf24-sniffer', component: Nrf24SnifferComponent },
	{ path: 'pihole-stats', component: PiholeStatsComponent },
	{ path: 'seven-segments', component: SevenSegmentsComponent },
	{ path: 'raspicam-stats', component: RaspicamStatsComponent },
	{ path: 'heating-stats', component: HeatingStatsComponent },
	{ path: '',
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
		HeatingStatsComponent
	],
	imports: [
		RouterModule.forRoot(appRoutes),
		BrowserModule,
		FormsModule,
		HttpModule,
		ButtonModule
	],
	providers: [
		IpcService,
		EnvironmentService,
		SerialDataService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
