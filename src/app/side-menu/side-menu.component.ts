import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
	selector: 'app-side-menu',
	templateUrl: './side-menu.component.pug',
	styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
	isOpenAside = true;

	constructor(@Inject(DOCUMENT) private document: any, private router: Router) { }

	ngOnInit() {
	}

	changeRoute(type: string){
		this.router.navigate(["/" + type]);
	}

	toggleAside(){
		this.isOpenAside = !this.isOpenAside;

		if(this.document.querySelector('html').classList.contains("aside-open")){
			this.document.querySelector('html').classList.remove("aside-open");
		}
		else{
			this.document.querySelector('html').classList.add("aside-open");
		}
	}
}
