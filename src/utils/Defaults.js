// @ts-check
'use strict';

/**
 * Global default configuration for Vts (Validate Then Submit).
 *
 * @type {import('../ValidateThenSubmit').VtsConfig}
 */
const vtsDefaults = {
  ajax: {
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
      const title =
        'message' in errorResponse ? errorResponse.message : 'Error!';
      const html =
        'stack' in errorResponse
          ? errorResponse.stack
          : 'Unknown error occurred';

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
  },
  fnValid: (data, form) => {
    showFeedback('valid', data);
  },
  fnInvalid: (data, form) => {
    showFeedback('invalid', data);
  },
  halt: false,
  listen: false,
  rules: {},
  message: {
    invalid: 'Invalid ${label}',
    valid: '',
  },
  stopPropagation: true,
  validatedClass: 'was-validated',
};

/**
 * @param {string} state
 * @param {any} data
 */
function showFeedback(state, data) {
  for (const key in data) {
    const { field, label, message = ' ' } = data[key];
    const parent = field.parentNode;
    const className = `${state}-feedback`;
    const sibling = parent?.querySelector(`.${className}`);

    // field.style.border =
    //   state === 'valid' ? '1px solid #146c43' : '1px solid #b02a37';
    if (sibling) {
      sibling.textContent = `${message}`;
    } else {
      const div = document.createElement('div');
      div.classList.add(`${className}`);
      div.textContent = `${message}`;
      // div.style.color = state === 'valid' ? '#146c43' : '#b02a37';
      parent?.append(div);
    }

    const validSib = parent?.querySelector(`.valid-feedback`);
    const invalidSib = parent?.querySelector(`.invalid-feedback`);

    // if (state === 'valid') {
    //   toggleElementDisplay(validSib, invalidSib);
    // } else {
    //   toggleElementDisplay(invalidSib, validSib);
    // }

    /**
     * @param {Element | null | undefined} show the element to show
     * @param {Element | null | undefined} hide the element to hide
     */
    function toggleElementDisplay(show, hide) {
      if (show instanceof HTMLElement) {
        show.style.display = '';
      }
      if (hide instanceof HTMLElement) {
        hide.style.display = 'none';
      }
    }
  }
}

export default vtsDefaults;
