import Vts from './Vts';
export { setVtsDefaults } from './Defaults.js';

export default class ValidateThenSubmit extends Vts {
  constructor(formId, config = {}) {
    super(formId, config);
  }
  #updateFormData() {
    this.formData = new FormData(this.form);
  }
  abortSubmit() {
    this.abortController.abort();
  }
  /**
   * Checks the validity of the form.
   * @returns {Boolean} True if the form is valid, false otherwise.
   */
  isFormValid() {
    return this.form.checkValidity();
  }

  /**
   * @description Submits the form via fetch API.
   * @returns {Promise} A promise that resolves on success or rejects on failure.
   * @async
   */
  async submit() {
    const form = this.form;
    const ajax = this.config.ajax;
    const request = _.merge({ body: this.#updateFormData() }, ajax.request);
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
  }
}
