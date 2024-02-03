// @ts-check
import getResponseMessage from '../utils/getResponseMessage';
import showDialog from '../utils/response/showDialog';

/** @type {import("../types/config/ajaxSettings").default} */
const ajaxHandler = {
  action: '',
  request: {},
  beforeSend: (requestInit, form, abortController) => {
    /*
     * This is the `beforeSend` event renderFeedback for the form.
     * It is called before the form is submitted, and it can be used to modify the request or prevent the form from being submitted.
     */

    // Get the submit button element from the form.
    const submitBtn = getSubmitButtonFrom(form);

    if (!submitBtn) return;

    // If the submit button exists, then we do the following:
    const vtsSessionId = `__Vts_${form.id}_submitDisplay`;

    // Clone the submit button.
    const cancelBtn = submitBtn.cloneNode();
    if (
      cancelBtn instanceof HTMLButtonElement ||
      cancelBtn instanceof HTMLInputElement
    ) {
      cancelBtn.type = 'button';
      cancelBtn.textContent = 'Cancel';
      cancelBtn.classList.add(vtsSessionId);
      // Add an event listener to the cloned button that aborts the request.
      cancelBtn.addEventListener(
        'click',
        () => {
          abortController.abort();
        },
        { signal: abortController.signal }
      );
      // Add the cloned button to the form.
      submitBtn.parentElement?.append(cancelBtn);
    }
    // Store the original display style of the submit button in session storage.
    const submitBtnDisplay = window.getComputedStyle(submitBtn).display;
    window.sessionStorage.setItem(vtsSessionId, submitBtnDisplay);
    // Set the display of the submit button to "none".
    submitBtn.style.display = 'none';
  },
  complete: (data, response, form) => {
    /*
     * This is the `complete` event renderFeedback for the form.
     * It is called after the form is submitted, and it can be used to handle the response or perform cleanup tasks.
     */

    // Get the submit button element from the form.
    const submitBtn = getSubmitButtonFrom(form);

    if (!submitBtn) return;

    // Get the session ID for this form.
    const vtsSessionId = `__Vts_${form.getAttribute('id')}_submitDisplay`;

    // Get the cancel button element from the form.
    /** @type {HTMLButtonElement|HTMLInputElement|null} */
    const cancelBtn = form.querySelector(`.${vtsSessionId}`);

    if (cancelBtn) {
      // Remove the cancel button from the form.
      cancelBtn.remove();

      // Get the stored display style of the submit button from session storage.
      const submitBtnDisplay = window.sessionStorage.getItem(vtsSessionId);
      if (submitBtnDisplay) {
        // Set the display style of the submit button to the stored value.
        submitBtn.style.display = submitBtnDisplay;
      }
    }
  },
  error: (errorData, errorResponse, form) => {
    const { title, message } = getResponseMessage(errorData, errorResponse);
    if (title !== 'AbortError') showDialog(title, message);
  },
  success: (data, response, form) => {
    const { title, message } = getResponseMessage(data, response);
    form.reset();
    form.classList.remove('was-validated');
    showDialog(title, message);
  },
};

/**
 * @param {Element} parent
 * @returns {HTMLButtonElement|HTMLInputElement|null}
 */
function getSubmitButtonFrom(parent) {
  return parent.querySelector('[type="submit"]');
}

export default ajaxHandler;
