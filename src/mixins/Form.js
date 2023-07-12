// @ts-chec
import deepMerge from '../utils/deepMerge';

/** @type {import('../ValidateThenSubmit').VtsForm} */
const vtsForm = {
  isFormValid() {
    return this.form.checkValidity();
  },

  async submit() {
    const ajax = this.ajax;
    const form = this.form;
    try {
      let url = ajax.action;

      // beforeSend
      // ajax.request = this.ajax.request =
      //   ajax.beforeSend(ajax.request, form) || ajax.request;

      [url, ajax.request] = vtsFormBeforeSend.call(this, url, ajax.request);

      // const get = new RegExp('get', 'i');
      // const isGetMethod = get.test(ajax.request.method);
      // if (isGetMethod) {
      //   const query = new URLSearchParams(formData).toString();
      //   url = this.ajax.action = `${url}/?${query}`;
      // } else {
      //   ajax.request.body = formData;
      // }

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
      if (error instanceof Response) {
        try {
          const errorData = await error.json();
          ajax.error(errorData, error, form);
        } catch (e) {
          ajax.error(e, error, form);
        }
      } else {
        ajax.error(null, error, form);
      }
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
 * @this {import('../ValidateThenSubmit').default}
 */
function vtsFormBeforeSend(url, request) {
  const formData = new FormData(this.form);

  request = this.ajax.request =
    this.ajax.beforeSend(this.ajax.request, this.form) || request;

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
