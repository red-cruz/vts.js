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
    //   * Clone the submit button.
    //   * Set the text of the cloned button to "Cancel".
    //   * Add the cloned button to the form.
    //   * Add an event listener to the cloned button that aborts the request.
    //   * Store the original displays style of the submit button in session storage.
    //   * Set the display of the submit button to "none".
    const vtsSessionId = `__Vts_${form.getAttribute('id')}_submitDisplay`;
    const cancelBtn = submitBtn.cloneNode();
    if (
      cancelBtn instanceof HTMLButtonElement ||
      cancelBtn instanceof HTMLInputElement
    ) {
      cancelBtn.type = 'button';
      cancelBtn.textContent = 'Cancel';
      cancelBtn.classList.add(vtsSessionId);
      cancelBtn.addEventListener(
        'click',
        () => {
          abortController.abort();
        },
        { signal: abortController.signal }
      );
      submitBtn.parentElement?.append(cancelBtn);
    }
    const submitBtnDisplay = window.getComputedStyle(submitBtn).display;
    window.sessionStorage.setItem(vtsSessionId, submitBtnDisplay);
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

// {

//
//   error: (errorData, errorResponse, form) => {
//     let title;
//     let message;

//     // transform data
//     // errorResponse is null if the error did not come from the server,
//     // i.e. AbortError or an error thrown from the success callback.
//     if (errorResponse) {
//       /*
//         errorData here contains the response from the server.
//         If the content-type is 'application/json', errorData is the parsed JavaScript object obtained from the Response.json() method.
//         If the request headers' content-type is 'text/html' or 'text/plain', errorData is a string.
//         If the request headers' content-type is neither of the above, errorData is not null, but it
//         means the response body has a content-type that is not one of the expected types.
//         The response body could still be processed using other methods such as response.blob(),
//         response.formData(), or response.arrayBuffer(), depending on the actual content type.
//         If you have specific handling for different content types, you can check and process accordingly.
//       */

//       // Set default title to the HTTP status text
//       title = errorResponse.statusText;
//       message = errorData;

//       if (errorData) {
//         /*
//           Handle the errorData when it's a valid response (JavaScript object or string).
//           For example, if it's an object, you can access data like errorData.title or errorData.message.
//           If it's a string, it contains the error message or HTML content.
//         */
//         if (typeof errorData === 'object') {
//           title = errorData.title || title; // Use the custom title from the errorData if available
//           message = errorData.message || message; // Use the custom message from the errorData if available
//         }
//       } else {
//         /*
//           If errorData is not null, it means the response body has a content-type that is not
//           application/json, text/html, or text/plain.
//           To read the response body, you can use response methods here like response.blob(), response.formData(),
//           or response.arrayBuffer() depending on the actual content type.
//           For example, to read the response body as a blob:
//             const errorBlob = await errorResponse.blob();
//             console.log('Error response body as Blob:', errorBlob);
//         */
//         // Perform other handling for the error content.
//       }
//     } else {
//       // Check if the error is an AbortError, which occurs when the fetch request is aborted
//       if (
//         errorData instanceof DOMException &&
//         errorData.name === 'AbortError'
//       ) {
//         // Handle the aborted fetch request here
//         title = errorData.name;
//         message = errorData.message;
//       }
//       // Check if the error is a regular Error object
//       else if (errorData instanceof Error) {
//         // Handle other types of errors here
//         title = errorData.name;
//         message = errorData.message;
//       } else {
//         // Handle cases where the error is not an Error or an AbortError
//         title = 'Oops, sorry about that. An unknown error occurred.';
//         message = errorData;
//       }
//     }

//     // main function here
//     const ok = confirm(`${title}. Click "OK" to view more details.`);
//     if (ok) {
//       const newWindow = window.open();
//       if (newWindow) newWindow.document.body.innerHTML = message;
//     }
//   },
//   success: (data, response, form) => {
//     const isDataObj = typeof data === 'object';
//     const title = isDataObj ? data.title : response.statusText;
//     const message = isDataObj ? data.message : data;

//     alert(title + ':\n' + message);

//     form.reset();
//     form.classList.remove('was-validated');
//   },
// }

export default ajaxHandler;
