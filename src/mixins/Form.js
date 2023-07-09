/** @type {import('../ValidateThenSubmit').VtsForm} */
const vtsForm = {
  isFormValid() {
    return this.form.checkValidity();
  },

  async submit() {
    const form = this.form;
    const ajax = this.config.ajax;
    const request = _.merge({ body: new FormData(form) }, ajax.request);
    try {
      ajax.beforeSend(this.abortController, form);
      const response = await fetch(ajax.action, request);
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
export default vtsForm;
