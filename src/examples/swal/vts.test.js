import vtsDefaults from './vts.defaults.js';

export default class Vts {
  constructor(formId, config = {}) {
    const form = document.getElementById(formId);
    if (!form) {
      console.error('Invalid form element.');
      return;
    }

    this.form = form;
    this.formData = new FormData();
    this.fields = Array.from(
      form.querySelectorAll('[name]:not([data-vts-ignored])')
    );
    this.config = this.#deepMerge({}, vtsDefaults, config);
    this.log && console.group('vts_logs');
    this.log && console.time('vts_exec_time');
    this.#log('log', this);

    this.#validate();
  }

  #validate() {
    this.#log('info', 'Validation started');
    const config = this.config;

    for (const field of this.fields) {
      this.#log('log', 'validating:', field);

      if (config.trim) {
        field.value = field.value.trim();
      }

      const rule = this.#hasRule(field);
      const fnInvalidTitle = 'Invalid ' + this.#getLabel(field);
      let fnInvalidMessage = field.validationMessage;

      if (rule) {
        const newMessage = this.#applyRule(field, rule);
        fnInvalidMessage = newMessage || fnInvalidMessage;
      }

      const configClass = config.class;
      if (field.checkValidity()) {
        field.classList.remove(configClass.invalid);
        field.classList.add(configClass.valid);

        if (config.mode === 'each') {
          this.#log('success', 'calling the "valid" function...');
          config.fnValid(field, this.#getLabel(field));
        }

        if (field.type === 'file') {
          this.#appendFile(field);
        } else {
          this.formData.append(field.name, field.value);
        }
      } else {
        field.classList.remove(configClass.valid);
        field.classList.add(configClass.invalid);
        if (config.mode === 'each') {
          this.#log('warn', 'calling the "invalid" function...');
          config.fnInvalid(
            field,
            this.#getLabel(field),
            fnInvalidTitle,
            fnInvalidMessage
          );
          break;
        }
      }
    }

    if (config.mode === 'all') {
      this.#log('success', 'calling the "valid" function...');
      const validFields = this.fields.filter((field) =>
        field.classList.contains(config.class.valid)
      );
      config.fnValid(validFields);

      this.#log('warn', 'calling the "invalid" function...');
      const invalidFields = this.fields.filter((field) =>
        field.classList.contains(config.class.invalid)
      );
      config.fnInvalid(invalidFields);
    }

    this.#log('info', 'Validation ended');

    if (this.halt && this.isValid()) {
      this.#log('warn', 'Submission halted');
    } else {
      this.submit().catch(() => {});
    }
  }

  #getLabel(field) {
    const dataLabel = field.dataset.vtsLabel;
    const labelNode = this.form.querySelector(`label[for="${field.id}"]`);
    const labelText = labelNode ? labelNode.textContent : null;
    const placeholder = field.getAttribute('placeholder');
    const label = dataLabel || labelText || placeholder || '';
    return label;
  }

  #appendFile(field) {
    if (field.type === 'file') {
      this.#log('info', 'processing file input...');
      const files = field.files;
      const fileGroup = field.dataset.vtsFileGroup;
      for (const file of files) {
        if (fileGroup) {
          this.formData.append(fileGroup, file);
        } else {
          this.formData.append(field.name, file);
        }
      }
    }
  }

  #applyRule(field, rule) {
    const configRules = this.config.rules;
    const ruleMethod = configRules[rule];
    const invalidMessage = field.validationMessage;

    if (ruleMethod) {
      const customMessage = ruleMethod(field.value, field, invalidMessage);
      return customMessage;
    }

    return null;
  }

  #hasRule(field) {
    const rules = field.dataset.vtsRules;
    if (rules && this.config.rules) {
      const ruleList = rules.split('|');
      for (const rule of ruleList) {
        if (this.config.rules.hasOwnProperty(rule)) {
          return rule;
        }
      }
    }
    return null;
  }

  #deepMerge(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (this.#isObject(target) && this.#isObject(source)) {
      for (const key in source) {
        if (this.#isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          this.#deepMerge(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }

    return this.#deepMerge(target, ...sources);
  }

  #isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
  }

  #log(type, ...messages) {
    if (this.log) {
      const logMethod = console[type];
      if (logMethod) {
        logMethod(...messages);
      } else {
        console.log(...messages);
      }
    }
  }

  isValid() {
    return this.form.checkValidity();
  }

  submit() {
    return new Promise((resolve, reject) => {
      if (this.isValid()) {
        const xhr = new XMLHttpRequest();
        const config = this.config;

        xhr.open(config.method, config.url);
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            this.#log('success', 'Form submitted successfully.');
            config.fnSuccess(xhr.response, xhr.status, xhr);
            resolve(xhr.response);
          } else {
            this.#log('error', 'Error submitting the form.');
            config.fnInvalid(xhr.response, xhr.status, xhr);
            reject(xhr.response);
          }
        };

        xhr.onerror = () => {
          this.#log('error', 'An error occurred while submitting the form.');
          config.fnInvalid(xhr.response, xhr.status, xhr);
          reject(xhr.response);
        };

        xhr.send(this.formData);
      } else {
        this.#log('error', 'Form is not valid. Cannot submit.');
        reject('Form is not valid.');
      }
    });
  }
}
