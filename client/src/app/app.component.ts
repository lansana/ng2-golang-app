import { Component } from '@angular/core';

import { WebSocketService } from './shared';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    constructor(private socket: WebSocketService) {
        this.socket.makeConnection();
    }
}
