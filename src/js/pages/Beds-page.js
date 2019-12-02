import IntroSlider from '../components/Section-beds-intro-slider';
import MattressesSlider from '../components/Section-mattresses';
import Elevation from '../components/Section-accessories';
import Accordion from '../components/Accordion';
import IntoBedsSlider from '../components/Section-into-beds-slider';

export default class {
  constructor(props) {
    this.bedIndex = props.bedIndex;
    this.scrollToMattresses = props.scrollToMattresses;
    this.introSlider = new IntroSlider({
      bedIndex: 0,
    });
    this.mattressesSlider = new MattressesSlider({
      bedIndex: this.bedIndex,
    });
    this.elevation = new Elevation();
    this.accordion = new Accordion({
      container: document.getElementById('beds-accordion'),
    });
    this.intoBedsSlider = new IntoBedsSlider();
  }

  init() {
    this.introSlider.init();
    this.mattressesSlider.init();
    this.elevation.init();
    this.intoBedsSlider.init();
    this.accordion.init();
    if (this.bedIndex > 0) {
      setTimeout(() => {
        TweenLite.to(window, 0, {
          scrollTo: '#mattresses',
        });
      }, 0);
    }
  }

  destroy() {
    this.introSlider.destroy();
    this.mattressesSlider.destroy();
    this.elevation.destroy();
    this.accordion.destroy();
    this.intoBedsSlider.destroy();
  }
}
