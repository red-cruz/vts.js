'use strict';
import vtsDefaults from './defaults.js';
import RuleUtil from './utils/Rule.js';
import Check from './utils/Check.js';
import deepMerge from './utils/deepMerge.js';
import Log from './utils/Log.js';
import EventUtil from './utils/Event.js';

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
   * @param {String} formId
   * @param {object} [config] optional configuration
   * @memberof Vts
   */
  constructor(formId, config = {}) {
    Check.instance(formId);

    const form = document.getElementById(formId);

    Check.form(form);

    // assign properties
    /** @type {HTMLFormElement} */
    this.form = form;
    this.formData = new FormData(form);
    this.fields = form.querySelectorAll('[name]:not([data-vts-ignored])');
    this.config = deepMerge({}, vtsDefaults, config);
    this.abortController = new AbortController();

    this.#addEventListeners();
  }

  #addEventListeners() {
    const form = this.form;
    const config = this.config;

    // Form
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (config.stopPropagation) e.stopPropagation();

      Log.start(this);

      this.#validate();

      if (this.isValid() && !config.halt) {
        this.submit();
      }
    });

    // Fields
    this.fields.forEach((field) => {
      const rule = this.getFieldRules(field);
      const eventType = EventUtil.getType(field.type, rule?.eventType);

      field.addEventListener(eventType, (e) => {
        this.#validate(false);
      });
    });
  }

  /**
   * @description Validates each field in the form.
   * @memberof Vts
   */
  #validate(submit = true) {
    const mustLog = this.config.log;
    Log.show(mustLog, 'info', 'Validation started');
    const config = this.config;
    const form = this.form;

    for (const field of this.fields) {
      this.currentField = field;
      Log.show(mustLog, 'log', 'validating:', field);

      const [valid, label, title, message] = RuleUtil.apply.call(this);

      if (valid) field.setCustomValidity('');
      else field.setCustomValidity(message);

      if (field.checkValidity()) {
        if (config.mode === 'each') {
          Log.show(mustLog, 'success', 'calling the "valid" function...');
          config.fnValid(field, label);
        }
      } else {
        if (config.mode === 'each') {
          console.log(field, 'eto');
          Log.show(mustLog, 'warn', 'calling the "invalid" function...');
          config.fnInvalid(field, label, title, message);
          break;
        }
      }
    }

    this.#validateAll();
    Log.show(mustLog, 'info', 'Validation ended');

    if (submit) if (!config.halt && this.isValid()) this.submit();

    Log.end(this.config.log, form.id);
  }

  #validateAll() {
    const config = this.config;
    const mustLog = config.log;
    const not = ':not([data-vts-ignored], [type="submit"])';

    if (config.mode !== 'all') return;

    Log.show(mustLog, 'success', 'calling the "valid" function...');
    config.fnValid(this.form.querySelectorAll(`:valid${not}`), this.form);

    Log.show(mustLog, 'warn', 'calling the "invalid" function...');
    config.fnInvalid(this.form.querySelectorAll(`:invalid${not}`), this.form);
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

  getFieldRules(field = this.currentField) {
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
    const config = this.config;
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
