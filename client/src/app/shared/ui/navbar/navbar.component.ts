import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'ui-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    title = "Angular2 Chat Room";

    constructor(public titleService: Title) {}

    setTitle(title: string): void {
        this.titleService.setTitle(title);
    }
}
