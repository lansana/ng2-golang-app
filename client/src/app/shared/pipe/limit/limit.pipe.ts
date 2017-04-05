import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limit'
})
export class LimitPipe implements PipeTransform {
  transform(value: string, wordwise: boolean, max: number = 100, tail?: string): string {
    if (!value) return;

    if (!max || value.length <= max) return value;

    value = value.substr(0, max);

    if (wordwise) {
      let lastPlace = value.lastIndexOf(' ');

      if (lastPlace > -1) {
        value = value.substr(0, lastPlace);
      }
    }

    return value + (tail || '');
  }
}
