import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent {
  @Input() size: string;
  @Input() position: string;
  @Input() barebones: boolean;
}
