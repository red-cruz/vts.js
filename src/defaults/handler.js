// @ts-check
import Vts from '../Vts';

/** @type {import("../types/config/handlers").default} */
const vtsHandlers = {
  invalid: showFeedback,
  valid: showFeedback,
};

/**
 * @param {string} fieldClass
 * @param  {import("../types/config/handlers").VtsValidationData<string>} data
 * @param {HTMLFormElement} form
 * @param {NodeListOf<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>} fields
 */
function showFeedback(fieldClass, data, form, fields) {
  console.log(fieldClass, data);
  for (const fieldName in data) {
    const { field, messages = {}, label } = data[fieldName];

    const container = field.parentNode;
    const feedbackDiv = container?.querySelector('.' + fieldClass);
    const textContent = isFirstField(fields, field)
      ? Object.values(messages).flat().join('<br />')
      : '';

    if (feedbackDiv) {
      feedbackDiv.innerHTML = textContent;
    } else {
      const newDiv = document.createElement('div');
      newDiv.classList.add(fieldClass);
      newDiv.innerHTML = textContent;
      container?.append(newDiv);
    }
  }
}

/**
 * @param {NodeListOf<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>} fields
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @returns {boolean}
 */
function isFirstField(fields, field) {
  const group = Vts.getGroupedFields(fields, field.name);
  return !!group.find((input, index) => input === field && index === 0);
}

export default vtsHandlers;
