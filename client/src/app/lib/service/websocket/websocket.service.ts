import { Injectable } from '@angular/core';

@Injectable()
export class WebSocketService {
  public socket = null;
  private uri = "ws://" + window.location.hostname + ":80/ws";

  makeConnection(): void {
    window.onload = () => {
      this.socket = new WebSocket(this.uri);

      this.socket.onopen = function (e) {
        console.log(`Connected to ${e.currentTarget.url}.`);
      };

      this.socket.onclose = function () {
        console.log('Disconnected from WebSocket.');
      };

      this.socket.onerror = function (e) {
        console.log(`Error connecting to ${e.currentTarget.url}.`);
      };

      this.socket.onmessage = function (e) {
        console.log(`WebSocket message received: ${e.data}`);
      };
    };
  }

  setSocketOnMessage(fn: Function): void {
    this.socket.onmessage = function (evt) {
      fn(evt.data, evt);
    };
  }

  onReady(cb: Function): void {
    let socketInterval = setInterval(() => {
      if (this.isConnected()) {
        cb();

        clearInterval(socketInterval);
      }
    }, 50);
  }

  send(data: any): void {
    this.socket.send(data);
  }

  isConnecting(): boolean {
    if (this.socket instanceof WebSocket) {
      return this.socket.readyState === 0;
    }

    return false;
  }

  isConnected(): boolean {
    if (this.socket instanceof WebSocket) {
      return this.socket.readyState === 1;
    }

    return false;
  }

  isClosing(): boolean {
    if (this.socket instanceof WebSocket) {
      return this.socket.readyState === 2
    }

    return false;
  }

  isClosed(): boolean {
    if (this.socket instanceof WebSocket) {
      return this.socket.readyState === 3;
    }

    return false;
  }
}
