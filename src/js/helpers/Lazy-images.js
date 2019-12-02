export default class {
  constructor() {
    this.ATTR = 'data-lazy-src';
    this.images = null;
    this.observerOptions = {
      threshold: 0,
      rootMargin: null,
    };
    this.observer = null;
  }

  handleObserver(e) {
    for (const entry of e) {
      if (entry.isIntersecting) {
        const target = entry.target;
        target.src = target.getAttribute('data-lazy-src');
        target.removeAttribute('data-lazy-src');
        this.observer.unobserve(target);
      }
    }
  }

  init() {
    this.observerOptions.rootMargin = `${window.innerHeight / 3}px 0px ${window.innerHeight / 3}px 0px`;
    this.images = document.querySelectorAll(`[${this.ATTR}]`);
    if (!this.images.length) return;
    this.observer = new IntersectionObserver(this.handleObserver.bind(this), this.observerOptions);
    this.images.forEach(image => {
      this.observer.observe(image);
    });
  }

  destroy() {
    if (this.observer && this.observer.disconnect) {
      this.observer.disconnect();
      this.observer = null;
      this.images = null;
    }
  }
}
