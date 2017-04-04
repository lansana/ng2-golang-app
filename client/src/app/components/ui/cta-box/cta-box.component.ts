import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ui-cta-box',
  templateUrl: './cta-box.component.html',
  styleUrls: ['./cta-box.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CtaBoxComponent {
  @Input() text: string;
  @Input() url: string;
  @Input() iconName: string;
  @Input() iconSize: string;
  @Input() inline?: boolean = false;
}
