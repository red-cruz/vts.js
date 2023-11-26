// @ts-check
/** @type {import("../types/config/handlers").default} */
const vtsHandlers = {
  invalid: showFeedback,
  valid: showFeedback,
};

/**
 * @param {string} fieldClass
 * @param  {import("../types/config/handlers").VtsValidationData<string>} data
 * @param {HTMLFormElement} form
 */
function showFeedback(fieldClass, data, form) {
  for (const key in data) {
    const { field, messages = {}, label } = data[key];
    const container = field.parentNode;
    const feedbackDiv = container?.querySelector('.' + fieldClass);
    const textContent = messages.required
      ? messages.required
      : Object.values(messages).flat().join('<br />');

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

export default vtsHandlers;
