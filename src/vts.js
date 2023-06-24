'use strict';
import vtsDefaults from './defaults.js';
import RuleUtil from './utils/Rule.js';
import Check from './utils/Check.js';
import deepMerge from './utils/deepMerge.js';
import Log from './utils/Log.js';
import EventUtil from './utils/Event.js';

/**
 * A JavaScript library that provides a simple and flexible way to handle
 * form validation before submitting. It allows you to customize the validation rules,
 * error messages, and actions to be performed when a form field is valid or invalid.
 *
 * @author RED
 * @class Vts
 */
export default class Vts {
  /**
   * Creates an instance of Vts.
   * @param {String} formId
   * @param {object} [config] optional configuration
   * @memberof Vts
   */
  constructor(formId, config = {}) {
    const form = document.getElementById(formId);
    this.abortController = new AbortController();
    this.config = deepMerge({}, vtsDefaults, config);
    this.fields = form.querySelectorAll('[name]:not([data-vts-ignored])');
    this.form = form;
    this.formData = new FormData(form);
    this.currentField = form;
    this.#init();
  }

  #init() {
    const form = this.form;
    Check.instance(form.id);
    Check.form.call(form);
    this.#addEventListeners();
  }

  #addEventListeners() {
    const form = this.form;
    const config = this.config;

    // Form
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (config.stopPropagation) e.stopPropagation();

      Log.start.call(this);

      this.#validate();

      if (this.isValid() && !config.halt) {
        this.submit();
      }
    });

    // Fields
    this.fields.forEach((field) => {
      const rules = this.#getFieldRules(field);
      const eventType = EventUtil.getType(field.type, rules?.eventType);

      field.addEventListener(eventType, () => {
        this.#checkValidity(field);
      });
    });
  }

  /**
   * @description Validates each field. triggered by form submit event
   * @memberof Vts
   */
  #validate() {
    const form = this.form;
    const config = this.config;
    const mustLog = config.log;
    Log.show(mustLog, 'info', 'Validation started');

    for (const field of this.fields) {
      this.#checkValidity(field);
    }

    const not = ':not([data-vts-ignored], [type="submit"])';
    config.fnValid(form.querySelectorAll(`:valid${not}`), form);
    config.fnInvalid(form.querySelectorAll(`:invalid${not}`), form);
    Log.end(mustLog, form.id);
  }

  #execValid() {}
  #execInvalid() {}

  /**
   * @description
   * @author RED
   * @param {HTMLElement} field
   * @memberof Vts
   */
  #checkValidity(field) {
    this.currentField = field;
    const config = this.config;
    const mustLog = config.log;
    Log.show(mustLog, 'log', 'validating:', field);

    const [valid, label, title, message] = RuleUtil.apply.call(this);

    if (valid) field.setCustomValidity('');
    else field.setCustomValidity(message);
  }

  #validateAll() {
    const config = this.config;
    const mustLog = config.log;
    const not = ':not([data-vts-ignored], [type="submit"])';
    config.fnValid(this.form.querySelectorAll(`:valid${not}`), this.form);
    config.fnInvalid(this.form.querySelectorAll(`:invalid${not}`), this.form);

    Log.show(mustLog, 'success', 'calling the "valid" function...');

    Log.show(mustLog, 'warn', 'calling the "invalid" function...');
  }

  /**
   * Checks the validity of the form.
   * @returns {Boolean} True if the form is valid, false otherwise.
   */
  isValid() {
    return this.form.checkValidity();
  }

  abort() {
    this.abortController.abort();
  }

  #getFieldRules(field = this.currentField) {
    if (!field) return null;
    const fieldName = field.name;
    const rules = this.config.rules[fieldName];
    return rules;
  }

  /**
   * @description Submits the form via fetch API.
   * @returns {Promise} A promise that resolves on success or rejects on failure.
   * @async
   */
  async submit() {
    delete this.currentField;
    const form = this.form;
    const ajax = this.config.ajax;
    const action = ajax.action || form.action;
    const method = ajax.method || form.method;
    const default_request = {
      method: method,
      request: {
        'Content-Type': 'multipart/form-data',
      },
      body: this.formData,
    };
    const rawRequest = deepMerge({}, default_request, ajax.request);
    const signal = this.abortController.signal;
    const request = { ...rawRequest, signal };
    try {
      ajax.beforeSend(this.abortController, form);
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
  }
}
