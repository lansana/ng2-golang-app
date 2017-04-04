/**
 * Chatty.js
 *
 * A lightweight notification library for broadcasting messages in a user-interface.
 *
 * Author: Lansana Camara - https://github.com/lansana/chatty
 * @license MIT
 */

export class Chatty {
  private id: string = 'chatty-' + new Date().getTime();
  private body: HTMLElement = document.body;
  private chatty: HTMLElement = null;

  constructor(private cfg?: any) {
    this.cfg = {
      message: 'Woohoo, you rock!',
      duration: 3000,
      infinite: false,
      position: 'bottom right',
      renderHtml: false,
      isError: false,
      styles: {}
    };

    if (cfg) {
      this.extend(this.cfg, cfg);
    }
  }

  /**
   * Show chatty
   *
   * @returns {Chatty}
   */
  public show(): Chatty {
    let chatty = this.reset(this.chatty);

    if (!chatty) {
      chatty = this.create();
    }

    // Add chatty to the body
    this.body.appendChild(chatty);

    // Set the chatty object
    this.chatty = document.getElementById(chatty.id);

    // Set chatty to be automatically removed if applicable
    if (!this.cfg.infinite) {
      setTimeout(() => {
        this.remove();
      }, this.cfg.duration);
    }

    return this;
  }

  /**
   * Update chatty configuration
   *
   * @param cfg
   * @returns {Chatty}
   */
  public update(cfg: any): Chatty {
    this.extend(this.cfg, cfg);

    // Update text
    if (this.cfg.renderHtml) {
      this.setText(this.chatty, this.cfg.message, true);
    } else {
      this.setText(this.chatty, this.cfg.message);
    }

    // Update class
    this.chatty.className = 'chatty-container ' + this.cfg.position;

    // Update class
    this.chatty.className = 'chatty-container ' + this.cfg.position;

    // Update styles
    this.extend(this.chatty.style, this.cfg.styles);

    // Update error class
    if (this.cfg.isError) {
      this.chatty.className += ' error';
    }

    return this;
  }

  /**
   * Remove chatty from DOM
   *
   * @returns {Chatty}
   */
  public close(): Chatty {
    this.remove();

    return this;
  }

  /**
   * Create chatty DOM node
   *
   * @returns {HTMLElementTagNameMap[string]}
   */
  private create(): HTMLElement {
    // Create chatty container
    let chatty = document.createElement('div');
    chatty.className = 'chatty-container ' + this.cfg.position + (this.cfg.isError ? ' error' : '');
    chatty.id = this.id;

    // Set styles if applicable
    this.extend(chatty.style, this.cfg.styles);

    // Create chatty message
    let chattyMessage = document.createElement('div');
    chattyMessage.className = 'chatty-message';
    if (this.cfg.renderHtml) {
      this.setText(chattyMessage, this.cfg.message, true);
    } else {
      this.setText(chattyMessage, this.cfg.message);
    }

    // Add chatty message to chatty container
    chatty.appendChild(chattyMessage);

    return chatty;
  }

  /**
   * Remove Chatty from DOM
   *
   * @returns {Chatty}
   */
  private remove(): Chatty {
    // Fade out
    this.chatty.style.opacity = '0';

    // Wait a second and clean up the crumbs
    setTimeout(() => {
      this.body.removeChild(this.chatty);
    }, 1000);

    return this;
  }

  /**
   * Update the properties of the chatty after it has been "removed" in order to
   * allow it to be seen again if the 'show' method is called again
   *
   * @param chatty
   * @returns {HTMLElement}
   */
  private reset(chatty: HTMLElement): HTMLElement {
    if (chatty && chatty.style) {
      chatty.style.opacity = '1';
    }

    return chatty;
  }

  /**
   * Cross-browser implementation to set text value of a node.
   * 'innerText' and 'textValue' have their problems.
   *
   * @param chatty
   * @param text
   * @param renderHtml
   */
  private setText(chatty: HTMLElement, text: string, renderHtml?: boolean): void {
    while (chatty.firstChild !== null) {
      chatty.removeChild(chatty.firstChild);
    }

    if (renderHtml) {
      let d = document.createElement('div');
      d.innerHTML = text;

      while (d.firstChild) {
        chatty.appendChild(d.firstChild);
      }
    } else {
      chatty.appendChild(document.createTextNode(text));
    }
  }

  /**
   * Merge two objects. Sort of like jQuery.fn.extend.
   *
   * @param oldCfg
   * @param newCfg
   */
  private extend(oldCfg: any, newCfg: any): void {
    for (let key in newCfg) {
      if (newCfg && newCfg.hasOwnProperty(key)) {
        oldCfg[key] = newCfg[key];
      }
    }
  }
}
