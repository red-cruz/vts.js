// @ts-check
/** @type {import("../types/config").VtsAjaxSettings} */
const ajaxHandler = {
  action: '',
  request: {},
  beforeSend: (requestInit, abortController, form) => {},
  complete: (form) => {},
  error: (errorData, errorResponse, form) => {
    let title;
    let message;

    // transform data
    // errorResponse is null if the error did not come from the server,
    // i.e. AbortError or an error thrown from the success callback.
    if (errorResponse) {
      /* 
        errorData here contains the response from the server.
        If the content-type is 'application/json', errorData is the parsed JavaScript object obtained from the Response.json() method.
        If the request headers' content-type is 'text/html' or 'text/plain', errorData is a string.
        If the request headers' content-type is neither of the above, errorData is not null, but it
        means the response body has a content-type that is not one of the expected types.
        The response body could still be processed using other methods such as response.blob(),
        response.formData(), or response.arrayBuffer(), depending on the actual content type.
        If you have specific handling for different content types, you can check and process accordingly.
      */

      // Set default title to the HTTP status text
      title = errorResponse.statusText;
      message = errorData;

      if (errorData) {
        /* 
          Handle the errorData when it's a valid response (JavaScript object or string).
          For example, if it's an object, you can access data like errorData.title or errorData.message.
          If it's a string, it contains the error message or HTML content.
        */
        if (typeof errorData === 'object') {
          title = errorData.title || title; // Use the custom title from the errorData if available
          message = errorData.message || message; // Use the custom message from the errorData if available
        }
      } else {
        /* 
          If errorData is not null, it means the response body has a content-type that is not
          application/json, text/html, or text/plain.
          To read the response body, you can use response methods here like response.blob(), response.formData(),
          or response.arrayBuffer() depending on the actual content type.
          For example, to read the response body as a blob:
            const errorBlob = await errorResponse.blob();
            console.log('Error response body as Blob:', errorBlob);
        */
        // Perform other handling for the error content.
      }
    } else {
      // Check if the error is an AbortError, which occurs when the fetch request is aborted
      if (
        errorData instanceof DOMException &&
        errorData.name === 'AbortError'
      ) {
        // Handle the aborted fetch request here
        title = errorData.name;
        message = errorData.message;
      }
      // Check if the error is a regular Error object
      else if (errorData instanceof Error) {
        // Handle other types of errors here
        title = errorData.name;
        message = errorData.message;
      } else {
        // Handle cases where the error is not an Error or an AbortError
        title = 'Oops, sorry about that. An unknown error occurred.';
        message = errorData;
      }
    }

    // main function here
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

export default ajaxHandler;
