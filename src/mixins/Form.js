/** @type {import('../vts').VtsForm} */
const vtsForm = {
  isFormValid() {
    return this.form.checkValidity();
  },

  async submit() {
    const ajax = this.ajax;
    const form = this.form;
    try {
      let url = ajax.action;
      [url, ajax.request] = vtsFormBeforeSend.call(this, url, ajax.request);

      // fetch
      const response = await fetch(new Request(url, ajax.request));
      if (!response.ok) {
        throw response;
      }

      // get response data
      const contentType = response.headers.get('Content-Type');
      if (contentType) {
        let data;
        if (contentType.includes('application/json')) {
          data = await response.json();
        } else if (
          contentType.includes('text/html') ||
          contentType.includes('text/plain')
        ) {
          data = await response.text();
        } else {
          data = null;
        }
        // call success callback function
        ajax.success(data, response, form);
      } else {
        throw new Error('Content-Type header not found in the response');
      }
    } catch (error) {
      let errorData = error;
      let errorResponse = null;

      // Reinitialize abort controller if aborted
      if (this.ajax.request?.signal?.aborted) {
        this.ajax.abortController = new AbortController();
      }

      // Check if the error is an instance of Response
      if (error instanceof Response) {
        errorResponse = error;
        const contentType = error.headers.get('Content-Type');

        // Check the content type of the error response
        if (contentType) {
          if (contentType.includes('application/json')) {
            // Read the error response body as JSON
            errorData = await error.json();
          } else if (
            contentType.includes('text/html') ||
            contentType.includes('text/plain')
          ) {
            // Read the error response body as text
            errorData = await error.text();
          } else {
            // Content type is not JSON, HTML, or plain text
            // Set errorData to null for handling other types of response
            errorData = null;
          }
        }
      }
      // Call the error callback function with the appropriate data
      ajax.error(errorData, errorResponse, form);
    }
    // complete
    ajax.complete(form);
  },
};

/**
 * @description
 * @author RED
 * @param {string} url
 * @param {RequestInit} request
 * @returns {[url, request]}
 * @this {import('../vts').default}
 */
function vtsFormBeforeSend(url, request) {
  const formData = new FormData(this.form);

  this.ajax.abortController = new AbortController();
  this.ajax.request.signal = this.ajax.abortController.signal;

  request = this.ajax.request =
    this.ajax.beforeSend(
      this.ajax.request,
      this.ajax.abortController,
      this.form
    ) || request;

  const get = new RegExp('get', 'i');
  const isGetMethod = get.test(request.method);
  if (isGetMethod) {
    const query = new URLSearchParams(formData.toString());
    url = this.ajax.action = `${url}/?${query}`;
  } else {
    request.body = formData;
  }
  return [url, request];
}

export default vtsForm;
