import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'notes',
    templateUrl: 'notes.component.html',
    styleUrls: ['notes.component.scss']
})
export class NotesComponent {
  constructor(private titleService: Title) {}

  setTitle(title: string): void {
    this.titleService.setTitle(title);
  }
}
