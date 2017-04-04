import { Component, ViewEncapsulation } from '@angular/core';
import { WebSocketService } from './shared/service/websocket/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor(private socket: WebSocketService) {
    this.socket.makeConnection();
  }
}
