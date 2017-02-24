import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-side-menu',
	templateUrl: './side-menu.component.pug',
	styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

	constructor(private router: Router) { }

	ngOnInit() {
	}

	changeRoute(type: string){
		console.log("change route type", type);
		this.router.navigate(["/" + type]);
	}

}
