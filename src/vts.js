'use strict';
import vtsDefaults from './defaults.js';
import rules from './utils/applyRules.js';
import deepMerge from './utils/deepMerge.js';
import log from './utils/log.js';

/**
 * @description A JavaScript library that provides a simple and flexible way to handle
 * form validation before submitting. It allows you to customize the validation rules,
 * error messages, and actions to be performed when a form field is valid or invalid.
 * @author RED
 * @class Vts
 */
export default class Vts {
  /**
   * Creates an instance of Vts.
   * @param {HTMLFormElement} form
   * @param {object} [config] optional configuration
   * @memberof Vts
   */
  constructor(form, config = {}) {
    this.form = form;
    this.formData = new FormData(form);
    this.fields = form.querySelectorAll('[name]:not([data-vts-ignored])');
    this.config = deepMerge({}, vtsDefaults, config);

    log.start(this);

    if (form) this.#validate();
    else console.error('Invalid form element.');
  }

  /**
   * @description Validates each field in the form.
   * @memberof Vts
   */
  #validate() {
    const mustLog = this.config.log;
    log.show(mustLog, 'info', 'Validation started');
    const config = this.config;
    const form = this.form;

    for (const field of this.fields) {
      this.currentField = field;
      log.show(mustLog, 'log', 'validating:', field);

      const [label, title, message] = rules.apply(this);

      if (field.checkValidity()) {
        if (config.mode === 'each') {
          log.show(mustLog, 'success', 'calling the "valid" function...');
          config.fnValid(field, label);
        }
      } else {
        if (config.mode === 'each') {
          console.log(field, 'eto');
          log.show(mustLog, 'warn', 'calling the "invalid" function...');
          config.fnInvalid(field, label, title, message);
          break;
        }
      }
    }

    this.#validateAll();
    log.show(mustLog, 'info', 'Validation ended');

    if (!config.halt && this.isValid()) this.submit();

    log.end(this.config.log, form.id);
  }

  #validateAll() {
    const config = this.config;
    const mustLog = config.log;
    if (config.mode !== 'all') return;

    log.show(mustLog, 'success', 'calling the "valid" function...');
    config.fnValid(this.form.querySelectorAll(':valid'), this.form);

    log.show(mustLog, 'warn', 'calling the "invalid" function...');
    config.fnInvalid(this.form.querySelectorAll(':invalid'), this.form);
  }

  /**
   * Checks the validity of the form.
   * @returns {Boolean} True if the form is valid, false otherwise.
   */
  isValid() {
    return this.form.checkValidity();
  }

  /**
   * @description Submits the form via fetch API.
   * @returns {Promise} A promise that resolves on success or rejects on failure.
   * @async
   */
  async submit() {
    const config = this.config;
    if (this.isValid()) {
      delete this.currentField;
      const form = this.form;
      const ajax = config.ajax;
      const action = ajax.action || form.action;
      const method = ajax.method || form.method;
      const default_request = {
        method: method,
        request: {
          'Content-Type': 'multipart/form-data',
        },
        body: this.formData,
      };
      const request = deepMerge({}, default_request, ajax.request);
      try {
        ajax.beforeSend();
        const response = await fetch(action, request);
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
    } else {
      log.show(config.log, 'error', 'Submission failed: Invalid form');
      Promise.reject('invalid form').catch(() => {});
    }
  }
}
