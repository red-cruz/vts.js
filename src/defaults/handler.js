// @ts-check
/**
 * @this {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement}
 * @param  {import("../types/base/validation").VtsValidationMessages} messages
 * @param {string} fieldClass
 */
function handler(messages, fieldClass) {
  const fieldWrapper = this.parentNode;
  const feedbackContainer = fieldWrapper?.querySelector('.' + fieldClass);
  const textContent = Object.values(messages).flat().join('<br />');
  console.log(arguments);
  if (feedbackContainer) {
    feedbackContainer.innerHTML = textContent;
  } else {
    const newContainer = document.createElement('div');
    newContainer.classList.add(fieldClass);
    newContainer.innerHTML = textContent;
    fieldWrapper?.append(newContainer);
  }
}

export default handler;
