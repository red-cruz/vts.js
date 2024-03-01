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
    invalid: 'vts-invalid-field',
    valid: 'vts-valid-field',
    wrapper: '',
    fieldWrapper: 'vts-field-was-validated',
  },
  shouldSubmit: true,
  renderFeedback: function (validationResults, renderClass) {
    // Extract the renderClass object
    const { wrapper, invalid, valid } = renderClass;

    // Check if field is valid
    const isValid = 'valid' in validationResults;

    // Determine the feedback class based on the validation result
    const feedbackClass = isValid ? valid : invalid;

    // Find the field wrapper
    let fieldWrapper;

    if (!wrapper) {
      fieldWrapper = getCommonParent(this);
    }

    if (!fieldWrapper) {
      fieldWrapper = findClosestElement(this, wrapper);
    }

    fieldWrapper.classList.add(renderClass.fieldWrapper);
    fieldWrapper.classList.add(isValid ? valid : invalid);
    fieldWrapper.classList.remove(!isValid ? valid : invalid);

    // Find the feedback container
    const vtsFeedbackClass = 'vts-validation-messages-container';
    const feedbackContainer = fieldWrapper?.querySelector(
      `.${vtsFeedbackClass}`
    );

    // Extract validation messages
    const textContent = Object.values(validationResults).flat().join('<br />');

    // Create the feedback container if it doesn't exist
    if (feedbackContainer instanceof HTMLElement) {
      // Update the feedback content and display
      feedbackContainer.innerHTML = textContent;
    } else {
      // Create a new feedback container and append it to the field wrapper
      const newContainer = document.createElement('div');
      newContainer.classList.add(vtsFeedbackClass, feedbackClass);
      newContainer.innerHTML = textContent;
      fieldWrapper?.append(newContainer);
    }
  },
  validateOnSumbit: false,
  messages: defaultMsg,
  onSubmit() {},
  rules: {},
  stopPropagation: true,
};

export default vtsDefaults;
