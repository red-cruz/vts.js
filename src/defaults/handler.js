// @ts-check
/** @type {import("../types1/config").VtsHandlers} */
const vtsHandlers = {
  invalid: showFeedback,
  valid: showFeedback,
};

/**
 * @param {string} fieldClass
 * @param  {import("../types1/validation").VtsValidationData<string>} data
 * @param {HTMLFormElement} form
 */
function showFeedback(fieldClass, data, form) {
  for (const key in data) {
    const { field, label, message = ' ' } = data[key];
    const parent = field.parentNode;
    const sibling = parent?.querySelector(`.${fieldClass}`);

    // field.style.border =
    //   state === 'valid' ? '1px solid #146c43' : '1px solid #b02a37';
    if (sibling) {
      sibling.textContent = message;
    } else {
      const div = document.createElement('div');
      div.classList.add(fieldClass);
      div.textContent = message;
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

export default vtsHandlers;
