import elelmentPath from '../helpers/event-path';

export default class {
  constructor(options) {
    this.el = options.el;
    this.time = options.time || 0;
    this.delay = options.delay || 0;
    this.watchTarget = options.watchTarget || false;
    this.disableOnTouch = options.disableOnTouch || false;
    this.dontShowCursorOnDestroy = options.dontShowCursorOnDestroy || false;
    this.MOVE_LISTENER = 'mousemove';
    this.TOUCH_LISTENER = 'touchstart';
    this.LOAD_LISTENER = 'cursorLoader';
    this.lastType = '';
    this.moveHandler = null;
    this.touchHandler = null;
    this.loadHandler = null;
    this.hidden = true;
    this.isLoading = false;
    this.loaderAttr = 'loader';
    this.attrType = 'data-cursor-type';
    this.attrColor = 'data-cursor-color';
    this.defaultTags = ['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'LABEL', 'SELECT'];
    this.STYLE_ELEMENT_ID = 'cursor-style-element';
    this.CSS_TEXT = `
* {
  cursor: none !important;
}`;
  }

  checkTarget(path) {
    if (path) {
      let typeResult = '';
      let colorResult = '';
      for (const el of path) {
        if (el.attributes) {
          const tag = el.tagName;
          const isLink = this.defaultTags.some(item => tag === item);
          const type = el.getAttribute(this.attrType) || (isLink ? 'bigger' : null);
          const color = el.getAttribute(this.attrColor);
          if (!typeResult && type) {
            typeResult = type;
          }
          if (!colorResult && color) {
            colorResult = color;
          }
          if (typeResult && colorResult) break;
        } else {
          break;
        }
      }
      if (this.isLoading) {
        this.setCursorType(this.loaderAttr);
      } else {
        this.setCursorType(typeResult);
      }
      this.el.setAttribute(this.attrColor, colorResult);
      this.lastType = typeResult;
    }
  }

  setCursorType(type) {
    this.el.setAttribute(this.attrType, type);
  }

  goToCustomCursor() {
    this.el.classList.add('visible');
    const existingStyleElement = document.getElementById(this.STYLE_ELEMENT_ID);
    if (existingStyleElement) return;
    const styleEl = document.createElement('style');
    styleEl.setAttribute('id', this.STYLE_ELEMENT_ID);
    styleEl.innerHTML = this.CSS_TEXT;
    document.head.appendChild(styleEl);
  }

  goToDefaultCursor() {
    this.el.classList.remove('visible');
    const existingStyleElement = document.getElementById(this.STYLE_ELEMENT_ID);
    if (existingStyleElement) {
      existingStyleElement.remove();
    }
  }

  handleMouseMove(e) {
    const path = elelmentPath(e);
    if (!path) return;
    if (this.watchTarget) {
      this.checkTarget(path);
    }
    if (this.hidden) {
      this.hidden = false;
      this.goToCustomCursor();
    }
    TweenLite.to(this.el, this.time, {
      delay: this.delay,
      x: e.clientX,
      y: e.clientY,
    });
  }

  handleLoaderEvent(e) {
    this.isLoading = e.detail.isLoading;
    if (this.isLoading) {
      this.setCursorType(this.loaderAttr);
    } else {
      this.setCursorType(this.lastType);
    }
  }

  init() {
    this.moveHandler = this.handleMouseMove.bind(this);
    this.loaderHandler = this.handleLoaderEvent.bind(this);
    this.touchHandler = this.destroy.bind(this);
    window.addEventListener(this.MOVE_LISTENER, this.moveHandler);
    window.addEventListener(this.LOAD_LISTENER, this.loaderHandler);
    if (this.disableOnTouch) {
      window.addEventListener(this.TOUCH_LISTENER, this.touchHandler);
    }
  }

  destroy() {
    window.removeEventListener(this.MOVE_LISTENER, this.moveHandler);
    window.removeEventListener(this.LOAD_LISTENER, this.loaderHandler);
    if (this.disableOnTouch) {
      window.removeEventListener(this.TOUCH_LISTENER, this.touchHandler);
    }

    if (this.dontShowCursorOnDestroy) {
      this.goToDefaultCursor();
    }
  }
}
