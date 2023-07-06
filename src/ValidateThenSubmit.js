'use strict';
import { vtsDefaults } from './defaults.js';
import Check from './utils/Check.js';
import * as _ from 'lodash';
import { getEventType, getFieldLabel } from './utils/static/getters.js';
import LogUtil from './utils/Log.js';

export { setVtsDefaults } from './defaults.js';
/**
 * A JavaScript library that provides a simple and flexible way to handle
 * form validation before submitting. It allows you to customize the validation rules,
 * error messages, and actions to be performed when a form field is valid or invalid.
 *
 * @author RED
 * @class Vts
 */
export default class ValidateThenSubmit {
  /**
   * Creates an instance of Vts.
   * @param {String} formId
   * @param {vtsDefaults} [config] optional configuration
   * @memberof ValidateThenSubmit
   */
  constructor(formId, config = {}) {
    const form = document.getElementById(formId);
    this.abortController = new AbortController();
    /** @type {vtsDefaults} */
    this.config = _.merge({}, vtsDefaults, config);
    /** @type {NodeListOf<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>}*/
    this.fields = form.querySelectorAll('[name]:not([data-vts-ignored])');
    this.form = form;
    this.#init();
  }

  /**
   * @description
   * @type {LogUtil}
   */
  #log;
  #data = {
    validFields: new Map(),
    invalidFields: new Map(),
  };

  #init() {
    const form = this.form;
    Check.instance(form.id);
    Check.form(form);
    this.#convertRulesToMap();
    this.#addEventListeners();
    this.#log = new LogUtil(this);
  }

  #convertRulesToMap() {
    const rules = this.config.rules;
    const rulesMap = new Map();

    for (const fieldName in rules) {
      if (Object.prototype.hasOwnProperty.call(rules, fieldName)) {
        rulesMap.set(fieldName, rules[fieldName]);
      }
    }

    this.config.rules = rulesMap;
  }

  #getFieldRules(fieldName) {
    return this.config.rules.get(fieldName);
  }

  #addEventListeners() {
    const form = this.form;
    // Form
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.config.stopPropagation) {
        e.stopPropagation();
      }

      this.#log.start();
      this.#validate();
      this.form.classList.add(this.config.validatedClass);

      if (this.isFormValid() && !this.config.halt) {
        this.submit();
      }
    });

    // Fields
    this.fields.forEach((field) => {
      const rules = this.#getFieldRules(field.name);
      const match = rules?.match;
      const eventType = getEventType(field.type, rules?.eventType);
      field.addEventListener(eventType, () => {
        this.#checkFieldValidity(field);
        this.#reportValidity();
      });
    });

    // Match events
    this.#attachMatchEvents();
  }

  #attachMatchEvents() {
    for (const [fieldName, rule] of this.config.rules.entries()) {
      const match = rule.match;
      const form = this.form;
      const field = form.querySelector(`[name="${fieldName}"]`);
      const rules = this.#getFieldRules(fieldName);
      const eventType = getEventType(field.type, rules?.eventType);
      if (match) {
        const inputEvent = new Event(eventType);
        const matchField = form.querySelector(`[name="${match}"]`);
        console.log(field, matchField, eventType);
        matchField.addEventListener(eventType, function () {
          field.dispatchEvent(inputEvent);
        });
      }
    }
  }

  #updateFormData() {
    this.formData = new FormData(this.form);
  }

  /**
   * @description Validates each field. triggered by form submit event
   * @memberof Vts
   */
  #validate() {
    this.#log.show('info', 'Validation started');

    for (const field of this.fields) {
      this.#checkFieldValidity(field);
    }

    this.#reportValidity();

    this.#log.end();
  }

  #reportValidity() {
    const data = this.#data;
    const validData = Object.fromEntries(data.validFields);
    const invalidData = Object.fromEntries(data.invalidFields);
    const form = this.form;
    const fnValid = this.config.fnValid;
    const fnInvalid = this.config.fnInvalid;
    fnValid(validData, form);
    fnInvalid(invalidData, form);
  }

  /**
   * @description
   * @author RED
   * @param {HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement} field
   * @memberof Vts
   */
  #checkFieldValidity(field) {
    this.#log.show('log', 'validating field:', field);
    this.#clearValidity(field);
    const rules = this.#getFieldRules(field.name);
    let fieldData = {
      field: field,
      label: getFieldLabel(field, this.form),
      message: '',
    };

    let valid = field.checkValidity();
    fieldData.message = field.validationMessage;

    if (rules) {
      // prevent rules from being applied if default html constraints exists
      if (valid) {
        let updatedData = [];
        // if rules should match
        if (rules.match) {
          updatedData = this.#applyMatch(rules, field.value, fieldData);
        } else {
          updatedData = this.#applyRules(rules, field.value, fieldData);
        }

        [valid, fieldData] = updatedData;
      }
    }
    fieldData.message = fieldData.message
      ?.replaceAll('${value}', field.value)
      .replaceAll('${label}', fieldData.label);
    this.#setValidity(valid, field, fieldData);
  }

  #applyMatch(rules, fieldValue, fieldData) {
    let valid = false;
    const matchingField = this.form.querySelector(`[name="${rules.match}"]`);
    const matchValue = matchingField.value;
    const regExp = new RegExp(`^${matchValue}$`, rules.flags);

    if (regExp.test(fieldValue)) {
      fieldData.message = rules.message?.valid;
      valid = true;
    } else {
      fieldData.message = rules.message?.invalid;
    }
    fieldData.message = fieldData.message
      ?.replaceAll('${targetValue}', matchValue)
      .replaceAll('${targetLabel}', getFieldLabel(matchingField, this.form));
    return [valid, fieldData];
  }

  #applyRules(rules, fieldValue, fieldData) {
    let valid = false;
    const regExp = new RegExp(rules.pattern, rules.flags);
    if (regExp.test(fieldValue)) {
      fieldData.message = rules.message?.valid;
      valid = true;
    } else {
      fieldData.message = rules.message?.invalid;
    }
    return [valid, fieldData];
  }

  #setValidity(valid, field, data) {
    if (valid) {
      this.#clearValidity(field);
      this.#data.invalidFields.delete(field.name);
      this.#data.validFields.set(field.name, data);
    } else {
      field.setCustomValidity(data.message);
      this.#data.validFields.delete(field.name);
      this.#data.invalidFields.set(field.name, data);
    }
  }

  #clearValidity(field) {
    field.setCustomValidity('');
  }

  /**
   * Checks the validity of the form.
   * @returns {Boolean} True if the form is valid, false otherwise.
   */
  isFormValid() {
    return this.form.checkValidity();
  }

  abortSubmit() {
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
      body: new FormData(form),
    };
    const rawRequest = _.merge({}, default_request, ajax.request);
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
