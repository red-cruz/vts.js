import vtsDefaults from './vts.defaults.js';
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
   * @param {String} formId - The ID of the form to be validated
   * @param {object} [config] optional configuration
   * @memberof Vts
   */
  constructor(formId, config = {}) {
    /** @type {HTMLFormElement} */
    const form = document.getElementById(formId);

    this.form = form;
    this.formData = new FormData();
    this.fields = form.querySelectorAll('[name]:not([data-vts-ignored])');
    /** @type {Object} */
    this.config = this.#deepMerge({}, vtsDefaults, config);

    this.log && console.group('vts_logs');
    this.log && console.time('vts_exec_time');
    this.#log('log', this);

    if (form) this.#validate();
    else console.error('Invalid form element.');
  }

  /**
   * @description Validates each field in the form.
   * @memberof Vts
   */
  #validate() {
    this.#log('info', 'Validation started');
    const config = this.config;

    const configClass = config.class;
    for (const field of this.fields) {
      this.currentField = field;
      this.#log('log', 'validating:', field);

      const rule = this.#hasRule();
      let fnInvalidTitle = 'Invalid ' + this.#getLabel();
      let fnInvalidMessage = field.validationMessage;

      if (rule) {
        const newMessage = this.#applyRule();
        fnInvalidTitle = rule.title || fnInvalidTitle;
        fnInvalidMessage = newMessage || fnInvalidMessage;
      }

      if (field.checkValidity()) {
        field.classList.remove(configClass.invalid);
        field.classList.add(configClass.valid);

        if (config.mode === 'each') {
          this.#log('success', 'calling the "valid" function...');
          config.fnValid(field, this.#getLabel());
        }

        if (this.type === 'file') this.#appendFile();
        else this.formData.append(field.name, field.value);
      } else {
        field.classList.remove(configClass.valid);
        field.classList.add(configClass.invalid);
        if (config.mode === 'each') {
          this.#log('warn', 'calling the "invalid" function...');
          config.fnInvalid(
            field,
            this.#getLabel(),
            fnInvalidTitle,
            fnInvalidMessage
          );
          break;
        }
      }
    }

    if (config.mode === 'all') {
      this.#log('success', 'calling the "valid" function...');
      config.fnValid(this.form.querySelectorAll('.' + configClass.valid));

      this.#log('warn', 'calling the "invalid" function...');
      config.fnInvalid(this.form.querySelectorAll('.' + configClass.invalid));
    }

    this.#log('info', 'Validation ended');

    // submit if not halted
    if (this.halt && this.isValid()) this.#log('warn', 'Submission halted');
    else this.submit().catch(() => {});
  }

  /**
   * @description Retrieves the label for the specified field.
   * @param {HTMLElement} [field] - The field element.
   * @memberof Vts
   * @returns {string} The field's label.
   */
  #getLabel(field = this.currentField) {
    const data_label = field.dataset.vtsLabel;
    const label_node = this.form.querySelector('label[for="' + field.id + '"]');
    const label_text = label_node ? label_node.textContent : null;
    const placeholder = field.getAttribute('placeholder');
    const label = data_label || label_text || placeholder || '';
    return label;
  }

  /**
   * @description Appends file input to the FormData object.
   * @memberof Vts
   */
  #appendFile() {
    /** @type {HTMLInputElement} */
    const field = this.currentField;
    if (field.type === 'file') {
      this.#log('info', 'processing file input...');
      const files = field.files;
      for (let i = 0; i < files.length; i++) {
        /** @type {Array} */
        const file_group = field.dataset.vtsFileGroup;
        const file = files[0];
        // Checks the current field if it has the "data-vts-file-group"
        if (file_group) this.formData.append(file_group, file);
        else this.formData.append(field.getAttribute('name'), file);
      }
      return true;
    } else return false;
  }

  /**
   * @description Logs messages to the console.
   * @param {string} type - The type of log (log, info, warn, success, error).
   * @param  {...any} message - The log messages.
   * @memberof Vts
   */
  #log(type, ...message) {
    if (!this.config.log) return;

    const msg = '%c' + message;
    const style = 'color: #FFFFFF; padding: 5px';

    switch (type) {
      case 'log':
        console.log(...message);
        break;
      case 'info':
        console.info(msg, 'background: #5DADE2;' + style);
        break;
      case 'success':
        console.info(msg, 'background: #008000;' + style);
        break;
      case 'warn':
        console.info(msg, 'background: #FF8C00;' + style);
        break;
      case 'error':
        console.info(msg, 'background: #FF0000;' + style);
    }
  }

  /**
   * @description Applies rules to the current field.
   * @memberof Vts
   * @returns {string} The custom validation message.
   */
  #applyRule() {
    /** @type {HTMLElement} */
    const field = this.currentField;
    const rule = this.rules[field.name];
    const value = field.value;
    const match = rule.match;
    const pattern = new RegExp(rule.pattern, rule.flags);
    let message = rule.message;
    let valid;

    // check if field has rule
    if (!rule) return;

    if (match) {
      this.#log('log', 'matching to:', match);
      valid = value == this.formData.get(match);
      const srcMatch = this.form.querySelector('[name="' + match + '"]');
      message =
        message ||
        this.#getLabel() + ' did not match ' + this.#getLabel(srcMatch);
    } else {
      this.#log('log', 'processing pattern:', pattern);
      valid = value.match(pattern);
    }
    // set custom validity
    if (valid) field.setCustomValidity('');
    else field.setCustomValidity(message);

    return message;
  }

  /**
   * @description Checks if the current field has a validation rule.
   * @returns {object} The rule object.
   */
  #hasRule() {
    const name = this.currentField.getAttribute('name');
    return vtsDefaults.rules[name];
  }

  /**
   * @description Deeply merges multiple objects.
   * @param {Object} target - The target object to merge into.
   * @param {Array} sources - The source objects to merge.
   * @returns {Object} The merged object.
   * @memberof Vts
   */
  #deepMerge(target, ...sources) {
    if (!sources.length) {
      return target;
    }

    const source = sources.shift();

    for (const key in source) {
      if (
        typeof source[key] === 'object' &&
        source[key] !== null &&
        !Array.isArray(source[key])
      ) {
        if (
          !target[key] ||
          typeof target[key] !== 'object' ||
          Array.isArray(target[key])
        ) {
          target[key] = {};
        }

        this.#deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
    return this.#deepMerge(target, ...sources);
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
    if (this.isValid()) {
      delete this.currentField;
      const ajax = this.config.ajax;
      const action = ajax.action || this.form.action;
      const method = ajax.method || this.form.method;
      const default_request = {
        method: method,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: this.formData,
      };

      const request = this.#deepMerge({}, default_request, ajax.request);
      try {
        const response = await fetch(action, request);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const [data, _] = await Promise.all([response.json(), response]);
          ajax.success(data, response);
        } else {
          throw new TypeError('Response is not in JSON format');
        }
      } catch (error) {
        if (error instanceof Response) {
          try {
            const errorData = await error.json();
            ajax.error(errorData, error);
          } catch (_) {
            console.log(_);
            ajax.error(null, error);
          }
        } else {
          ajax.error(null, error);
        }
      }
    } else {
      this.#log('error', 'Submission failed: Invalid form');
      return Promise.reject('invalid form');
    }
  }
}
