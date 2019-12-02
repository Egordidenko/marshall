import Instagram from '../components/Section-instagram';

export default class {
  constructor() {
    this.instagram = new Instagram();
  }

  init() {
    this.instagram.init();
  }

  destroy() {
    this.instagram.destroy();
  }
}
