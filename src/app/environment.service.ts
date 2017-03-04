import { Injectable, Inject, ChangeDetectorRef } from '@angular/core';
import { DOCUMENT } from "@angular/platform-browser";

@Injectable()
export class EnvironmentService {

	private html = this.document.querySelector("html") as any;

	constructor(@Inject(DOCUMENT) private document: Document) { }

	addClassOnHtml(className: string) {
		if (!this.html.classList.contains(className)) {
			this.html.classList.add(className);
		}
	}

	removeClassOnHtml(className: string) {
		if (this.html.classList.contains(className)) {
			this.html.classList.remove(className);
		}
	}
}
