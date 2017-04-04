import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-scrollbox',
  template: `<div class="scrollbox" [ngStyle]="{'max-height': max, 'min-height': min}" [ngClass]="{'inverse': inverse}">
                <ng-content></ng-content>
            </div>`,
  styleUrls: ['./scrollbox.component.scss']
})
export class ScrollboxComponent {
  @Input() min: string;
  @Input() max: string;
  @Input() inverse?: boolean = false;
}
