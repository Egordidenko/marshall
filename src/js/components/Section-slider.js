import Swiper from '../imports/import-swiper';

export default class {
  constructor() {
    this.slider = null;
    this.settings = {
      //preloadImages: true,
      //updateOnImagesReady: true,
      //lazy: true,
      //watchSlidesVisibility: true,
      slidesPerView: 'auto',
      freeMode: true,
      parallax: true,
      touchStartPreventDefault: false,
      touchMoveStopPropagation: false,
    };
  }

  init() {
    this.slider = new Swiper('#home-looks-slider', this.settings);
  }

  destroy() {
    this.slider.destroy();
    this.slider = null;
    this.settings = null;
  }
}
