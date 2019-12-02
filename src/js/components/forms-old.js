import serialize from './libs/form-serialaize';
import axios from 'axios';
// import qs from 'qs';
import jsonpAdapter from 'axios-jsonp';

export default () => {
  const attr = 'data-action';
  const forms = document.querySelectorAll(`[${attr}]`);
  if (forms.length === 0) return;
  const ERROR = 'error';
  const SUCCESS = 'success';
  const NO_EVENTS = 'disable-events';
  const PROCESSING = 'processing';

  const disableForm = form => {
    form.classList.add(NO_EVENTS);
    form.classList.add(PROCESSING);
  };

  const enableForm = form => {
    form.classList.remove(NO_EVENTS);
    form.classList.remove(PROCESSING);
  };

  const handleSuccess = form => {
    form.classList.remove(ERROR);
    form.classList.add(SUCCESS);
    enableForm(form);
  };

  const handleError = form => {
    form.classList.add(ERROR);
    enableForm(form);
  };

  const handleReset = form => form.classList.remove(SUCCESS);

  forms.forEach(form => {
    const action = form.getAttribute(attr);
    form.onsubmit = e => {
      e.preventDefault();
      if (form.classList.contains(PROCESSING)) return;
      disableForm(form);
      const formData = serialize(form);
      window.pardot_callback = data => {
        const result = data.result;
        if (result === 'success') {
          handleSuccess(form);
        } else {
          handleError(form);
        }
      };
      axios({
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
        adapter: jsonpAdapter,
        callbackParamName: 'c',
        url: action,
        params: formData,
      }).then(response => {
        console.error(response); // no way to have response, only redirect
        handleError(form);
      }).catch(error => {
        console.error(error); // if did not find server
        handleError(form);
      });
    };
    form.onreset = () => {
      handleReset(form);
    };
  });
}
