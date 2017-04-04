import { Component, Input, OnInit } from '@angular/core';

import { LoadingBarService } from './loading-bar.service';

@Component({
  selector: 'ui-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss']
})
export class LoadingBarComponent implements OnInit {
  @Input() color: string = '#2480fe';
  @Input() height: number = 2;

  progress: number = 0;
  show: boolean = false;

  constructor(private loadingBarService: LoadingBarService) {}

  ngOnInit(): void {
    this.loadingBarService.onProgressUpdate((progress, show) => {
      this.progress = progress;
      this.show = show;
    });
  }
}
