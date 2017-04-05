import { Component, OnInit } from '@angular/core';

import { WebSocketService, NotificationService, ClientCountService } from '../shared';

@Component({
    selector: 'chat-room',
    templateUrl: './chat-room.component.html',
    styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {
    users: number = 0;
    usersWord: string = 'people';

    messages: Array<string> = [];
    messagesWord: string = 'messages';

    model: any = {
        message: ''
    };

    constructor(private webSocketService: WebSocketService,
                private notificationService: NotificationService,
                private countService: ClientCountService) {}

    ngOnInit(): void {
        this.webSocketService.onReady(() => {
            this.webSocketService.setSocketOnMessage(this.socketOnMessage.bind(this));
        });

        this.updateOnlineCount();
    }

    socketOnMessage(data: any): void {
        let messages = data.split('\n');

        for (let i = 0; i < messages.length; i++) {
            this.addMessage(messages[i]);
        }
    }

    sendMessage(): void {
        this.webSocketService.send(this.model.message);

        if (this.model.message.indexOf('<script>') > -1) {
            this.notificationService.notifyXSS();
        }

        this.model.message = '';
    }

    addMessage(message: string): void {
        this.messages.unshift(message);
        this.messagesWord = this.messages.length > 1 ? 'messages' : 'message';
    }

    updateOnlineCount(): void {
        this.countService.getCount().subscribe(res => {
            this.users = res.client_count;
            this.usersWord = this.users > 1 ? 'people' : 'person';
        });
    }
}
