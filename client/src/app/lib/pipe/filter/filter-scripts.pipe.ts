import { Pipe, PipeTransform , SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

const troll = `&nbsp;<img src="/assets/img/nice-try.png" height="30">`;

@Pipe({
  name: 'filterScripts'
})
export class FilterScriptsPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    if (value.indexOf('<script>') > -1) {
      return this.sanitizer.sanitize(SecurityContext.HTML, value) + troll;
    }

    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
