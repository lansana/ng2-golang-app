import { Injectable } from "@angular/core";
import { Chatty } from "../util/chatty";

@Injectable()
export class NotificationService {
  notify(cfg?: any): Chatty {
    let chatty = new Chatty(cfg);
    chatty.show();

    return chatty;
  }

  notifyXSS(): void {
    this.notify({
      message: 'Nice try! XSS attacks are not allowed here, buddy.',
      isError: true
    });
  }
}
