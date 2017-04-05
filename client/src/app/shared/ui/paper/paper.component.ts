import { Component } from '@angular/core';

@Component({
  selector: 'ui-paper',
  template: '<div class="paper"><ng-content></ng-content></div>',
  styleUrls: ['./paper.component.scss']
})
export class PaperComponent {}
