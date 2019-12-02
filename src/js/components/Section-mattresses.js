import Swiper from '../imports/import-swiper';

export default class {
  constructor(props) {
    this.mainSlider = null;
    this.imageSliders = [];
    this.domImageSliders = null;
    this.mainSettings = {
      speed: 1000,
      allowTouchMove: false,
      effect: 'fade',
      autoHeight: true,
      fadeEffect: {
        crossFade: true,
      },
      on: {
        init() {
          if (props.bedIndex > 0) {
            this.slideTo(props.bedIndex - 1, 0);
          }
        },
      },
      pagination: {
        el: '#mattresses-pagination',
        type: 'bullets',
        clickable: true,
        bulletClass: 'mattresses__pagination-btn',
        bulletActiveClass: 'active',
        renderBullet(index, className) {
          return `<button class="${className}">No. ${index + 1}</button>`;
        },
      },
    };
    this.imageSettings = {
      slidesPerView: 'auto',
      freeMode: true,
      parallax: true,
      //watchSlidesVisibility: true,
      touchStartPreventDefault: false,
      touchMoveStopPropagation: false,
    };
  }

  init() {
    this.mainSlider = new Swiper('#mattresses-content-slider', this.mainSettings);

    this.domImageSliders = document.querySelectorAll('.mattresses__image-slider');
    this.domImageSliders.forEach((domSlider, index) => {
      this.imageSliders.push(new Swiper(domSlider, this.imageSettings));
    });
  }

  destroy() {
    this.mainSlider.destroy();
    this.mainSlider = null;
    this.mainSettings = null;
    this.imageSliders.forEach(slider => {
      slider.destroy();
    });
    this.imageSliders = null;
    this.imageSettings = null;
  }
}
