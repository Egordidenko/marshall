export default class {
  constructor() {
    this.mainButton = document.getElementById('language-main-btn');
    this.overlay = document.getElementById('header-overlay');
    this.content = null;
    this.blurableItems = null;
    this.CLASS_ACTIVE = 'active';
    this.BLUR_VALUE = '20px';
    this.BRIGHTNESS_VALUE = '70%';
    this.BODY_COLOR = '#737373';
    this.TIME = 1;
    this.opened = false;
    this.mainBtnClickHandler = null;
    this.overlayClickHandler = null;
    this.openEvent = null;
    this.closeEvent = null;
    this.resizeHandler = null;
    this.prevWindowWidth = window.innerWidth;
  }

  open() {
    window.dispatchEvent(this.openEvent);
    this.overlay.classList.add(this.CLASS_ACTIVE);
    this.mainButton.classList.add(this.CLASS_ACTIVE);
    TweenLite.set(document.body, {
      backgroundColor: this.BODY_COLOR,
    });
    TweenLite.to(this.blurableItems, this.TIME, {
      webkitFilter: `blur(${this.BLUR_VALUE})`,
      filter: `blur(${this.BLUR_VALUE})`,
      pointerEvents: 'none',
    });
    TweenLite.fromTo(this.content, this.TIME, {
      webkitFilter: `blur(0) brightness(100%)`,
      filter: `blur(0) brightness(100%)`,
    }, {
      webkitFilter: `blur(${this.BLUR_VALUE}) brightness(${this.BRIGHTNESS_VALUE})`,
      filter: `blur(${this.BLUR_VALUE}) brightness(${this.BRIGHTNESS_VALUE})`,
    });
  }

  close() {
    window.dispatchEvent(this.closeEvent);
    this.overlay.classList.remove(this.CLASS_ACTIVE);
    this.mainButton.classList.remove(this.CLASS_ACTIVE);
    TweenLite.to(document.body, this.TIME, {
      backgroundColor: '#fff',
    });
    TweenLite.to(this.blurableItems, this.TIME, {
      webkitFilter: `blur(0)`,
      filter: `blur(0)`,
      pointerEvents: 'auto',
    });
    const tl = TweenLite.to(this.content, this.TIME, {
      webkitFilter: `blur(0) brightness(100%)`,
      filter: `blur(0) brightness(100%)`,
    });
    tl.eventCallback('onComplete', () => {
      this.content.removeAttribute('style');
    });
  }

  handleMainBtnClick() {
    if (this.opened) {
      this.opened = false;
      this.close();
    } else {
      this.opened = true;
      this.open();
    }
  }

  initCustomEvents() {
    this.openEvent = new Event('langOpened');
    this.closeEvent = new Event('langClosed');
  }

  handleResize() {
    if (this.prevWindowWidth !== window.innerWidth) {
      this.close();
      this.prevWindowWidth = window.innerWidth;
    }
  }

  init() {
    this.content = document.querySelector('[data-barba="container"]');
    this.blurableItems = document.querySelectorAll('.blurable-on-lang-open');
    this.mainBtnClickHandler = this.handleMainBtnClick.bind(this);
    this.overlayClickHandler = this.close.bind(this);
    this.resizeHandler = this.handleResize.bind(this);
    this.mainButton.addEventListener('click', this.mainBtnClickHandler);
    this.overlay.addEventListener('click', this.overlayClickHandler);
    window.addEventListener('resize', this.resizeHandler);
    this.initCustomEvents();
  }

  destroy() {
    this.mainButton.removeEventListener('click', this.mainBtnClickHandler);
    this.overlay.removeEventListener('click', this.overlayClickHandler);
    window.removeEventListener('resize', this.resizeHandler);
    this.openEvent = null;
    this.closeEvent = null;
  }
}
