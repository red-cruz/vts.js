// @ts-check
import Vts from '../Vts';

/** @type {import("../types/config/ajaxSettings").default} */
const ajaxHandler = {
  action: '',
  request: {},
  beforeSend: (requestInit, abortController, form) => {
    /*
     * This is the `beforeSend` event handler for the form.
     * It is called before the form is submitted, and it can be used to modify the request or prevent the form from being submitted.
     */

    // Get the submit button element from the form.
    const submitBtn = getSubmitButtonFrom(form);

    if (!submitBtn) return;

    // If the submit button exists, then we do the following:
    const vtsSessionId = `__Vts_${form.getAttribute('id')}_submitDisplay`;

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
     * This is the `complete` event handler for the form.
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
    const { title, message } = Vts.getResponseMessage(errorData, errorResponse);

    if (title === 'AbortError') return;

    const ok = confirm(`${title}. Click "OK" to view more details.`);
    if (ok) {
      const newWindow = window.open();
      if (newWindow) newWindow.document.body.innerHTML = message;
    }
  },
  success: (data, response, form) => {
    const isDataObj = typeof data === 'object';
    const title = isDataObj ? data.title : response.statusText;
    const message = isDataObj ? data.message : data;

    alert(title + ':\n' + message);

    form.reset();
    form.classList.remove('was-validated');
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
