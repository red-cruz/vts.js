// @ts-check
'use strict';
import findClosestElement from '../utils/findClosestElement';
import getCommonParent from '../utils/getCommonParent';
import ajaxHandler from './ajax';
import defaultMsg from './defaultMsg';

/**
 * Global default configuration for Vts
 *
 * @type {import('../types/config').default}
 */
const vtsDefaults = {
  ajax: ajaxHandler,
  class: {
    form: 'vts-form-was-validated',
    invalid: 'vts-invalid-field-feedback',
    valid: 'vts-valid-field-feedback',
    wrapper: '',
    fieldWrapper: 'vts-field-was-validated',
  },
  shouldSubmit: true,
  renderFeedback: function (validationResults, renderClass) {
    // Extract the renderClass object
    const { wrapper, invalid, valid } = renderClass;

    // Check if field is valid
    const isValid = this.checkValidity();

    // Determine the feedback class based on the validation result
    const feedbackClass = isValid ? valid : invalid;

    // Find the field wrapper
    const fieldWrapper = !wrapper
      ? getCommonParent(this)
      : findClosestElement(this, wrapper);

    // Find the feedback container
    const vtsFeedbackClass = 'vts-feedback-container';
    const feedbackContainer = fieldWrapper?.querySelector(
      `.${vtsFeedbackClass}`
    );

    // Create the feedback container if it doesn't exist
    const textContent = Object.values(validationResults).flat().join('<br />');
    if (feedbackContainer instanceof HTMLElement) {
      // Update the feedback content and display
      feedbackContainer.innerHTML = textContent;
      feedbackContainer.style.display = 'block'; // forces the feedback to show when using bootstrap

      // toggle the feedback class
      feedbackContainer.classList.add(feedbackClass);
      feedbackContainer.classList.remove(!isValid ? valid : invalid);
    } else {
      // Create a new feedback container and append it to the field wrapper
      const newContainer = document.createElement('div');
      newContainer.classList.add(vtsFeedbackClass, feedbackClass);
      newContainer.innerHTML = textContent;
      newContainer.style.display = 'block';
      fieldWrapper?.append(newContainer);
    }
  },
  validateOnSumbit: false,
  messages: defaultMsg,
  rules: {},
  stopPropagation: true,
};

export default vtsDefaults;
