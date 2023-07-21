/** @type {import("../types/config").VtsAjaxSettings} */
const ajaxHandler = {
  action: '',
  request: {},
  beforeSend: (requestInit, abortController, form) => {},
  complete: (form) => {},
  error: (errorData, errorResponse, form) => {
    console.table(errorResponse);

    const dataObj = typeof errorData === 'object';
    const title = dataObj ? errorData.title : errorResponse.statusText;
    const message = dataObj ? errorData.message : errorData;

    const ok = confirm(`${title}. Click "ok" to view more details.`);

    if (ok) {
      const newWindow = window.open();
      if (newWindow) newWindow.document.body.innerHTML = message;
    }
  },
  success: (data, response, form) => {
    alert(data.title + ':\n' + data.message);
    form.reset();

    /** @type {NodeListOf<HTMLElement>} */
    const fields = form.querySelectorAll('[name]:not([data-vts-ignored])');

    fields.forEach((field) => {
      field.style.border = '';
      field.remove;
    });
    form.classList.remove('was-validated');
  },
};

export default ajaxHandler;
