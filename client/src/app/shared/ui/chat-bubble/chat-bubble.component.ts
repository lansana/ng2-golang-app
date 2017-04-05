import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-chat-bubble',
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.scss']
})
export class ChatBubbleComponent {
  @Input() text: string;
}
