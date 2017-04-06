import { Injectable } from '@angular/core';

@Injectable()
export class LoadingBarService {
    interval: number = 25;
    timer: any;
    progress: number = 0;
    show: boolean = false;
    progressUpdateFn: Function = null;

    private stop(): void {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    start(): void {
        this.stop();

        this.timer = setInterval(() => {
            if (this.progress === 100) {
                this.complete()
            }

            if (this.progress <= 60) {
                this.progress++;
                this.emitChange();

                if (!this.show) {
                    this.show = true;
                    this.emitChange();
                }
            }
        }, this.interval);
    }

    complete(): void {
        this.progress = 100;
        this.emitChange();
        this.stop();

        setTimeout(() => {
            this.show = false;
            this.emitChange();

            setTimeout(() => {
              this.progress = 0;
              this.emitChange();
            }, 250);
        }, 250);
    }

    onProgressUpdate(fn: Function): void {
        this.progressUpdateFn = fn;
    }

    emitChange(): void {
        if (this.progressUpdateFn) {
            this.progressUpdateFn(this.progress, this.show);
        }
    }
}
