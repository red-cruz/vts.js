'use strict';
import vtsDefaults from './defaults.js';
import RuleUtil from './utils/Rule.js';
import Check from './utils/Check.js';
import deepMerge from './utils/static/deepMerge.js';
import getValidatedFields, {
  getEventType,
  getFieldRules,
} from './utils/static/getters.js';
import LogUtil from './utils/Log.js';

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
    this.#init();
  }

  /**
   * @description
   * @type {LogUtil}
   */
  #log;
  #currentField;
  #init() {
    const form = this.form;
    Check.instance(form.id);
    Check.form.call(form);
    this.#addEventListeners();
    this.#log = new LogUtil(this);
  }

  #addEventListeners() {
    // Form
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.config.stopPropagation) e.stopPropagation();

      this.#log.start();

      this.#validate();

      if (this.isValid() && !this.isHalted()) {
        this.submit();
      }
    });

    // Fields
    this.fields.forEach((field) => {
      const rules = this.config.rules[field.name];
      const eventType = getEventType(field.type, rules?.eventType);
      field.addEventListener(eventType, () => {
        this.#checkFieldValidity(field);
      });
    });
  }

  /**
   * @description Validates each field. triggered by form submit event
   * @memberof Vts
   */
  #validate() {
    const mustLog = this.config.log;
    const fields = this.fields;

    this.#log.show('info', 'Validation started');

    for (const field of fields) {
      this.#checkFieldValidity(field);
    }

    this.#executeValidationFunctions();

    Log.end();
  }

  #executeValidationFunctions() {
    const form = this.form;
    const config = this.config;
    const validFields = getValidatedFields(form, 'valid');
    const invalidFields = getValidatedFields(form, 'invalid');
    config.fnValid(validFields, form);
    config.fnInvalid(invalidFields, form);
  }

  /**
   * @description
   * @author RED
   * @param {HTMLElement} field
   * @memberof Vts
   */
  #checkFieldValidity(field) {
    this.#currentField = field;
    this.#log.show('log', 'validating:', field);

    const [valid, label, title, message] = RuleUtil.apply.call(this);

    if (valid) field.setCustomValidity('');
    else field.setCustomValidity(message);
  }

  /**
   * Checks the validity of the form.
   * @returns {Boolean} True if the form is valid, false otherwise.
   */
  isValid() {
    return this.form.checkValidity();
  }

  isHalted() {
    return this.config.halt;
  }

  abort() {
    this.abortController.abort();
  }

  /**
   * @description Submits the form via fetch API.
   * @returns {Promise} A promise that resolves on success or rejects on failure.
   * @async
   */
  async submit() {
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
