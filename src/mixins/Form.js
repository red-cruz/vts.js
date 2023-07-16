/** @type {import('../Vts').VtsForm} */
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

      const response = await fetch(new Request(url, ajax.request));
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const [data, rawResponse] = await Promise.all([
          response.json(),
          response,
        ]);
        ajax.success(data, rawResponse, form);
      } else {
        throw new TypeError('Response is not in JSON format');
      }
    } catch (error) {
      let errorData;
      if (error instanceof Response) {
        try {
          errorData = await error.json();
        } catch (e) {
          errorData = e;
        }
      } else {
        errorData = null;
      }
      ajax.error(errorData, error, form);

      if (this.ajax.request?.signal?.aborted)
        this.ajax.abortController = new AbortController();
    }
    ajax.complete(form);
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

export default vtsForm;
