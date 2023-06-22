'use strict';
import vtsDefaults from './defaults.js';
import rules from './utils/applyRules.js';
import deepMerge from './utils/deepMerge.js';
import log from './utils/log.js';

const Instances = [];

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
    /** @type {HTMLFormElement} */
    const form = document.getElementById(formId);
    this.form = form;
    this.formData = new FormData(form);
    this.fields = form.querySelectorAll('[name]:not([data-vts-ignored])');
    this.config = deepMerge({}, vtsDefaults, config);
    this.abortController = new AbortController();

    const existingInstance = Instances.includes(formId);
    if (existingInstance) {
      throw new Error('Vts instance already exists for this form element.');
    }

    log.start(this);

    Instances.push(formId);

    this.#addEventListeners();

    if (form) this.#validate();
    else console.error('Invalid form element.');
  }

  #addEventListeners() {
    const config = this.config;
    const eventListeners = {
      input: [
        'text',
        'textarea',
        'range',
        'date',
        'number',
        'email',
        'url',
        'password',
      ],
      change: ['radio', 'select'],
    };

    // Form
    // config.halt &&
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (config.stopPropagation) e.stopPropagation();
      this.submit();
      console.log('triggered');
    });

    // Fields

    this.fields.forEach((field) => {
      let eventListener = 'input';
      if (eventListeners.change.includes(field.type)) eventListener = 'change';
      field.addEventListener(eventListener, (e) => {
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
    log.show(mustLog, 'info', 'Validation started');
    const config = this.config;
    const form = this.form;

    for (const field of this.fields) {
      this.currentField = field;
      log.show(mustLog, 'log', 'validating:', field);

      const [valid, label, title, message] = rules.apply.call(this);

      if (valid) field.setCustomValidity('');
      else field.setCustomValidity(message);

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

    if (submit) if (!config.halt && this.isValid()) this.submit();

    log.end(this.config.log, form.id);
  }

  #validateAll() {
    const config = this.config;
    const mustLog = config.log;
    const not = ':not([data-vts-ignored], [type="submit"])';

    if (config.mode !== 'all') return;

    log.show(mustLog, 'success', 'calling the "valid" function...');
    config.fnValid(this.form.querySelectorAll(`:valid${not}`), this.form);

    log.show(mustLog, 'warn', 'calling the "invalid" function...');
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
  getCurrentFieldRules() {
    const field = this.currentField;
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
    if (this.isValid()) {
      console.log('ok');
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
    } else {
      log.show(config.log, 'error', 'Submission failed: Invalid form');
      Promise.reject('invalid form').catch(() => {});
    }
  }
}
