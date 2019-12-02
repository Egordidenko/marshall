import Form from '../components/Form';

export default class {
  constructor() {
    this.form = new Form({
      $form: document.getElementById('contact-form'),
    });
  }

  init() {
    this.form.init();
  }

  destroy() {
    this.form.destroy();
  }
}
