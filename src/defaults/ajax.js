/** @type {import("../types/config").VtsAjaxSettings} */
const ajaxHandler = {
  action: '',
  request: {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  },
  beforeSend: (requestInit, abortController, form) => {},
  complete: (form) => {},
  error: (errorData, errorResponse, form) => {
    const data = errorData ? errorData : {};
    const title = 'message' in errorResponse ? errorResponse.message : 'Error!';
    const html =
      'stack' in errorResponse ? errorResponse.stack : 'Unknown error occurred';

    console.table(errorResponse);
    const text = data.title || title;
    const ok = confirm(text + ':\n' + 'Click "ok" to view more details.');
    if (ok) {
      const newWindow = window.open();
      if (newWindow) newWindow.document.body.innerHTML = data.html ?? html;
    }
  },
  success: (data, response, form) => {
    alert(data.title + ':\n' + data.text);
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
