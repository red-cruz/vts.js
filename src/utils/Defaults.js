// @ts-check
'use strict';

/**
 * Global default configuration for Vts (Validate Then Submit).
 *
 * @type {import('../ValidateThenSubmit').VtsConfig}
 */
const vtsDefaults = {
  ajax: {
    request: {},
    beforeSend: (abortController, form) => {},
    complete: (form) => {},
    error: (errorData, response, form) => {
      console.table(response);
      alert(errorData || response);
    },
    success: (data, response, form) => {
      alert(data.title + ':\n' + data.text);
      form.reset();
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
  log: false,
  rules: {},
  message: {},
  stopPropagation: true,
  validatedClass: 'was-validated',
};

/**
 * @param {string} state
 * @param {import('../types/config').VtsValidationData<string>} data
 */
function showFeedback(state, data) {
  Object.keys(data).forEach((key) => {
    const { field, label, message = ' ' } = data[key];
    const parent = field.parentNode;
    const className = `${state}-feedback`;
    const sibling = parent?.querySelector(`.${className}`);

    field.style.border =
      state === 'valid' ? '1px solid #146c43' : '1px solid #b02a37';
    if (sibling) {
      sibling.textContent = `${message}`;
    } else {
      const div = document.createElement('div');
      div.classList.add(`${className}`);
      div.textContent = `${message}`;
      div.style.color = state === 'valid' ? '#146c43' : '#b02a37';
      parent?.append(div);
    }

    const validSib = parent?.querySelector(`.valid-feedback`);
    const invalidSib = parent?.querySelector(`.invalid-feedback`);

    if (state === 'valid') {
      toggleElementDisplay(validSib, invalidSib);
    } else {
      toggleElementDisplay(invalidSib, validSib);
    }

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
  });
}

export { vtsDefaults };
