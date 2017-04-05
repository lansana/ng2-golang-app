import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-icon',
  template: `<i class="icon fa fa-{{name}} fa-{{size || '1'}}"></i>`
})
export class IconComponent {
  @Input() name: string;
  @Input() size?: string;
}

