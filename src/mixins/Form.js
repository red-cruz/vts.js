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
          throw new Error('Unsupported response format');
        }
        // success
        ajax.success(data, response, form);
      } else {
        throw new Error('Content-Type header not found in the response');
      }
    } catch (error) {
      // reinit abort controller if aborted
      if (this.ajax.request?.signal?.aborted)
        this.ajax.abortController = new AbortController();

      let errorData = error;
      // get error response data
      if (error instanceof Response) {
        const contentType = error.headers.get('Content-Type');
        if (contentType) {
          if (contentType.includes('application/json')) {
            errorData = await error.json();
          } else if (
            contentType.includes('text/html') ||
            contentType.includes('text/plain')
          ) {
            errorData = await error.text();
          }
        }
      }
      // error
      ajax.error(errorData, error, form);
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
