// @ts-check
import getResponseData from '../utils/getResponseData';

/** @type {import('../types/base/form').default} */
const vtsForm = {
  isFormValid() {
    return this.form.checkValidity();
  },
  async submit() {
    let data, response;
    let promiseResolved = true;
    const ajax = this.ajax;
    const form = this.form;
    try {
      let url = ajax.action;
      [url, ajax.request] = vtsFormBeforeSend.call(this, url, ajax.request);

      // fetch
      response = await fetch(new Request(url, ajax.request));

      if (!response.ok) throw response;

      data = await getResponseData(response);

      // call success callback function
      ajax.success(data, response, form);
    } catch (error) {
      data = error;
      response = null;

      // Reinitialize abort controller if aborted
      if (this.ajax.request.signal?.aborted) {
        // @ts-ignore
        this.ajax.abortController = new AbortController();
      }

      // Check if the error is an instance of Response
      if (error instanceof Response) {
        data = await getResponseData(error);
        response = error;
      }

      promiseResolved = false;
      // Call the error callback function with the appropriate data
      ajax.error(data, response, form);
    }
    // complete
    ajax.complete(data, response, form);

    return promiseResolved
      ? Promise.resolve({ data, response, form })
      : Promise.reject({ data, response, form });
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
  // @ts-ignore
  this.ajax.abortController = new AbortController();
  this.ajax.request.signal = this.ajax.abortController.signal;

  request = this.ajax.request =
    this.ajax.beforeSend(
      this.ajax.request,
      this.ajax.abortController,
      this.form
    ) || request;

  const vMethod = request.method || 'get';

  switch (vMethod.toLocaleLowerCase()) {
    case 'get':
    case 'delete':
      const query = new URLSearchParams(formData.toString());
      url = this.ajax.action = `${url}/?${query}`;
      break;
    case 'put':
    case 'patch':
      formData.append('_method', vMethod);
      request.method = 'post';
      request.body = formData;
      break;
    default:
      request.body = formData;
      break;
  }
  return [url, request];
}

export default vtsForm;
