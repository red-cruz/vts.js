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
    wrapper: '',
  },
  halt: false,
  renderFeedback: function (messages, renderClass) {
    const { wrapper, invalid, valid } = renderClass;
    const isValid = this.checkValidity();
    const fieldWrapper = wrapper
      ? this.closest(`.${wrapper}`)
      : this.parentNode;
    const feedbackContainerClass = isValid ? valid : invalid;
    const feedbackContainer = fieldWrapper?.querySelector(`.vts-feedback`);
    const textContent = Object.values(messages).flat().join('<br />');

    if (feedbackContainer instanceof HTMLElement) {
      feedbackContainer.innerHTML = textContent;
      feedbackContainer.style.display = 'block';
      feedbackContainer.classList.add(isValid ? valid : invalid);
      feedbackContainer.classList.remove(!isValid ? valid : invalid);
    } else {
      const newContainer = document.createElement('div');
      newContainer.classList.add('vts-feedback');
      newContainer.classList.add(feedbackContainerClass);
      newContainer.innerHTML = textContent;
      newContainer.style.display = 'block';
      fieldWrapper?.append(newContainer);
    }
  },
  listen: false,
  message: defaultMsg,
  rules: {},
  stopPropagation: true,
};

export default vtsDefaults;
