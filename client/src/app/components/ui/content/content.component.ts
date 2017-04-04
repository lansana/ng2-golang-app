import { Component } from '@angular/core';

@Component({
  selector: 'ui-content',
  template: `<div class="row content">
                <div class="col-sm-12">
                  <ng-content></ng-content>
                </div>
              </div>`
})
export class ContentComponent {}
