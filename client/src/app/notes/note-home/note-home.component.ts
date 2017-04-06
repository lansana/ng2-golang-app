import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'note-home',
    templateUrl: './note-home.component.html',
    styleUrls: ['./note-home.component.scss']
})
export class NoteHomeComponent {
  constructor(private titleService: Title) {}

  setTitle(title: string): void {
    this.titleService.setTitle(title);
  }
}
