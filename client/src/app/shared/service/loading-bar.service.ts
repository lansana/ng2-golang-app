import { Injectable } from '@angular/core';

@Injectable()
export class LoadingBarService {
    interval: number = 20;
    progress: number = 0;
    show: boolean = false;
    progressUpdateFn: Function = null;

    start(): void {
        let interval = setInterval(() => {
            if (this.progress === 100) {
                return clearInterval(interval);
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
