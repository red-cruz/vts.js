// @ts-check
'use strict';
import ajaxHandler from './ajax';
import defaultMsg from './defaultMsg';
/**
 * Global default configuration for Vts (Validate Then Submit).
 *
 * @type {import('../types/base/config').default}
 */
const vtsDefaults = {
  ajax: ajaxHandler,
  class: {
    form: 'was-validated',
    invalid: 'invalid-feedback',
    valid: 'valid-feedback',
    wrapper: 'vts-wrapper',
  },
  halt: false,
  renderFeedback: function (messages, fieldClass) {
    const fieldWrapper = this.parentNode;
    const feedbackContainer = fieldWrapper?.querySelector('.' + fieldClass);
    const textContent = Object.values(messages).flat().join('<br />');

    if (feedbackContainer) {
      feedbackContainer.innerHTML = textContent;
    } else {
      const newContainer = document.createElement('div');
      newContainer.classList.add(fieldClass);
      newContainer.innerHTML = textContent;
      fieldWrapper?.append(newContainer);
    }
  },
  listen: false,
  message: defaultMsg,
  rules: {},
  stopPropagation: true,
};

export default vtsDefaults;
