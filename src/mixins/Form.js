// @ts-check
/** @type {import('../Vts').VtsForm} */
const vtsForm = {
  isFormValid() {
    return this.form.checkValidity();
  },

  async submit() {
    const ajax = this.ajax;
    const form = this.form;
    let promiseState;

    try {
      let url = ajax.action;
      [url, ajax.request] = vtsFormBeforeSend.call(this, url, ajax.request);

      // fetch
      const response = await fetch(new Request(url, ajax.request));

      if (!response.ok) throw response;

      let data = await getResponseData(response);

      promiseState = Promise.resolve({ data, response, form });
      // call success callback function
      // @ts-ignore
      await ajax.success(data, response, form);
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

      promiseState = Promise.reject({ errorData, errorResponse, form });
      // Call the error callback function with the appropriate data
      await ajax.error(errorData, errorResponse, form);
    }
    // complete
    ajax.complete(form);
    return promiseState;
  },
};

/**
 * @description
 * @author RED
 * @param {string} url
 * @param {RequestInit} request
 * @returns {[url, request]}
 * @this {import('../Vts').default}
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
/**
 * Gets the data from the response.
 *
 * @param {Response} response The response object.
 * @returns {Promise<any>} A promise that resolves with the data from the response or rejects with an error.
 * @async
 */
async function getResponseData(response) {
  let data;
  try {
    const contentType = response.headers.get('Content-Type');
    if (contentType) {
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
    } else {
      throw new Error('Content-Type header not found in the response');
    }
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
}

export default vtsForm;
