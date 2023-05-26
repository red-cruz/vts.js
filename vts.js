'use strict';

/**
 * Global default configuration of vts - Validate Then Submit
 */
export const vtsDefaults = {
  /**
   * jQuery ajax settings
   */
  ajax: {
    /**
     * ajax beforeSend
     * @param {object} jqXHR
     * @param {object} settings
     */
    beforeSend: (jqXHR, settings) => {},
    /**
     * ajax complete
     * @param {object} jqXHR
     * @param {String} textStatus
     */
    complete: (jqXHR, textStatus) => {},
    /**
     * ajax error
     * @param {object} jqXHR
     * @param {String} textStatus
     * @param {String} errorThrown
     */
    error: (jqXHR, textStatus, errorThrown) => {
      const customError = jqXHR.responseJSON;
      const hasCustomError =
        'responseJSON' in jqXHR && 'title' in jqXHR.responseJSON;
      const html = hasCustomError ? customError.text : errorThrown;
      let cLog = jqXHR.responseText;

      let title = hasCustomError
        ? customError.title
        : textStatus + ': ' + jqXHR.status;
      if (jqXHR.status === 0) {
        title = cLog = 'Please check your connection.';
      }
      const text = title + '\nClick ok to view more details.' + '\n' + html;
      if (confirm(text) == true) {
        const newWindow = window.open();
        newWindow.document.body.innerHTML = cLog;
      }
      console.log(cLog);
    },
    /**
     * ajax success
     * @param {*} data
     * @param {String} textStatus
     * @param {object} jqXHR
     */
    success: (data, textStatus, jqXHR) => {
      alert(data.title + ':\n' + data.text);
    },
  },
  /**
   * the classes to be applied on the validated field
   */
  class: {
    /**
     * @type {String}
     */
    valid: 'valid',
    /**
     * @type {String}
     */
    invalid: 'invalid',
  },
  /**
   * Stops the form's submission.
   * @type {Boolean}
   */
  halt: false,
  /**
   * A function to be called if the field is invalid.
   * @param {Element} currentField
   * @param {String} label
   */
  invalid: (currentField, label, title, message) => {
    const _currentField = $(currentField)[0];
    const invalidTitle = title;
    const invalidMsg = message;
    _currentField.focus();
    currentField.css('border', '1px solid red');
    alert(invalidTitle + '\n' + invalidMsg);
  },
  log: false,
  /**
   * The validation mode.
   * The "each" mode will stop the validation if the current field is invalid.
   * The "all" mode will continue the validation until all fields have been checked.
   * Fields are validated in the same order as their DOM declaration.
   * @type {String}
   * @default 'each'
   */
  mode: 'each',
  /**
   * regular expressions
   * @type {Object}
   */
  rules: {},

  trim: true,
  /**
   * A function to be called if the field is invalid.
   * @param {Element} currentField
   * @param {String} label
   */
  valid: function (currentField) {
    currentField.css('border', '1px solid green');
  },
};

/**
 * @description - validate then submit via ajax
 * @author RED
 * @class Vts
 */
export default class Vts {
  /**
   * Creates an instance of Vts.
   * @param {HTMLFormElement} form the form element to be validated
   * @param {object} [config] optional configuration
   * @memberof Vts
   */
  constructor(form, config = {}) {
    if (!config.class) config.class = {};
    if (!config.ajax) config.ajax = {};

    this.form = $(form);
    // this.form = document.getElementById(form);
    this.formData = new FormData();
    // this.fields = this.form.querySelectorAll('[name]:not([data-vts-ignored])');
    this.fields = $(form).find('[name]').not('[data-vts-ignored]');
    this.rules = vtsDefaults.rules;
    this.trim = config.trim ?? vtsDefaults.trim;
    this.mode = config.mode || vtsDefaults.mode;
    this.halt = config.halt ?? vtsDefaults.halt;
    this.log = config.log ?? vtsDefaults.log;
    this.fnInvalid = config.invalid || vtsDefaults.invalid;
    this.fnValid = config.valid || vtsDefaults.valid;

    this.class = {
      valid: config.class.valid || vtsDefaults.class.valid,
      invalid: config.class.invalid || vtsDefaults.class.invalid,
    };

    this.ajax = {
      action: config.ajax.action || form.action,
      method: config.ajax.method || form.method,
      cache: config.ajax.cache ?? false,
      headers: config.ajax.headers || vtsDefaults.ajax.headers,
      beforeSend: config.ajax.beforeSend || vtsDefaults.ajax.beforeSend,
      success: config.ajax.success || vtsDefaults.ajax.success,
      error: config.ajax.error || vtsDefaults.ajax.error,
      complete: config.ajax.complete || vtsDefaults.ajax.complete,
    };

    this.log && console.group('vts_logs');
    this.log && console.time('vts_exec_time');
    this.#log('log', this);

    if (form.length) this.#validate();
    else console.error('Invalid form element.');

    if (this.log) {
      window.lVts = this;
      this.#log(
        'info',
        'To access the Vts instance, use the global variable `lVts`.'
      );
      this.#log(
        'info',
        'For example, you can call `lVts.isValid()` in the browser console.'
      );
      console.timeEnd('vts_exec_time');
      console.groupEnd();
    }
  }
  /**
   * @description Validate each field
   * @memberof Vts
   */
  #validate() {
    const $this = this;
    const formData = this.formData;

    $this.#log('info', 'Validation started');

    $.each(this.fields, function (i, field) {
      const $field = ($this.currentField = $(field));

      $this.#log('log', 'validating:', field);

      // trim value
      if ($this.trim) field.value = field.value.trim();

      const rule = $this.#hasRule();
      let fnInvalidTitle = 'Invalid ' + $this.#getLabel();
      let fnInvalidMessage = field.validationMessage;

      if (rule) {
        const newMessage = $this.#applyRule();
        fnInvalidTitle = rule.title || fnInvalidTitle;
        fnInvalidMessage = newMessage || fnInvalidMessage;
      }

      if (field.checkValidity()) {
        $field.removeClass($this.class.invalid);
        $field.addClass($this.class.valid);

        if ($this.mode === 'each') {
          $this.#log('success', 'calling the "valid" function...');
          $this.fnValid($field, $this.#getLabel());
        }

        if (this.type === 'file') $this.#appendFile();
        else formData.append(field.name, field.value);
      } else {
        $field.removeClass($this.class.valid);
        $field.addClass($this.class.invalid);

        if ($this.mode === 'each') {
          $this.#log('warn', 'calling the "invalid" function...');
          $this.fnInvalid(
            $field,
            $this.#getLabel(),
            fnInvalidTitle,
            fnInvalidMessage
          );
          // Break loop.
          return false;
        }
      }
    });

    if (this.mode === 'all') {
      $this.#log('success', 'calling the "valid" function...');
      $(this.fnValid(this.form.find('.' + this.class.valid)));

      $this.#log('warn', 'calling the "invalid" function...');
      $(this.fnInvalid(this.form.find('.' + this.class.invalid)));
    }

    $this.#log('info', 'Validation ended');

    // submit if not halted
    if (this.halt && this.isValid()) this.#log('warn', 'Submission halted');
    else this.submit().catch(() => {});
  }

  /**
   * @description get the field's label
   * @param {Element} [field]
   * @memberof Vts
   * @returns {string}
   */
  #getLabel(field = this.currentField) {
    const data_label = field.data('vts-label');
    const label_elem = $('label[for="' + field.attr('id') + '"]').text();
    const placeholder = field.attr('placeholder');
    const label = data_label || label_elem || placeholder || '';
    return label;
  }

  /**
   * @description append file to FormData
   * @memberof Vts
   */
  #appendFile() {
    const field = this.currentField;
    if (field.type === 'file') {
      this.#log('info', 'processing the file input...');
      const $this = this;
      $.each($(field)[0].files, function (x, file) {
        /** @type {Array} */
        const file_group = field.data('vts-file-group');
        // Checks the current field if it has the "data-vts-file-group"
        if (file_group) $this.formData.append(file_group, file);
        else $this.formData.append(field.attr('name'), file);
      });
      return true;
    } else return false;
  }

  /**
   * @description show logs
   * @param {string} type log | info | warn | success | warn | error
   * @param  {...any} message
   * @memberof Vts
   */
  #log(type, ...message) {
    if (!this.log) return;

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
   * apply rules
   */
  #applyRule() {
    const field = this.currentField[0];
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
      const srcMatch = this.form.find('[name="' + match + '"]');
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
   * @returns {object} rule object
   */
  #hasRule() {
    const name = this.currentField.attr('name');
    return vtsDefaults.rules[name];
  }

  /**
   * Checks the validity of form
   * @returns {Boolean}
   */
  isValid() {
    return this.form[0].checkValidity();
  }

  /**
   * @description submit form via ajax
   * @returns {jQuery<ajax>|Promise<reject>} jQuery ajax
   */
  submit() {
    if (this.isValid()) {
      delete this.currentField;
      const ajax = $.ajax({
        url: this.ajax.action,
        type: this.ajax.method,
        data: this.formData,
        processData: false,
        contentType: false,
        cache: this.ajax.cache,
        headers: this.ajax.headers,
        beforeSend: this.ajax.beforeSend,
        success: this.ajax.success,
        error: this.ajax.error,
        complete: this.ajax.complete,
      });
      this.#log('success', 'Ajax request sent');
      return ajax;
    } else {
      this.#log('error', 'Submission failed: Invalid form');
      return Promise.reject('invalid form');
    }
  }
}

// jQuery Plugin
(function ($) {
  /**
   * Creates an instance of Vts.
   * @param {object} config
   * @returns {Vts}
   */
  $.fn.vts = function (config) {
    return new Vts(this[0], config);
  };
})(jQuery);

// vts class
// Wait for the DOM content to be loaded
document.addEventListener('DOMContentLoaded', function () {
  // Select all elements with the class 'vts'
  const forms = document.querySelectorAll('.vts');

  // Iterate over each form
  forms.forEach(function (form) {
    // Set the 'novalidate' attribute to true to disable HTML5 validation
    form.setAttribute('novalidate', true);

    // Add a submit event listener to the form
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Retrieve the data attributes from the form
      const mode = form.dataset.vtsMode;
      const invalidCallback = window[form.dataset.vtsInvalid];
      const validCallback = window[form.dataset.vtsValid];
      const beforeSendCallback = window[form.dataset.vtsBeforeSend];
      const successCallback = window[form.dataset.vtsSuccess];
      const errorCallback = window[form.dataset.vtsError];
      const completeCallback = window[form.dataset.vtsComplete];

      // Create a new instance of the Vts object with the provided callbacks
      new Vts(form, {
        mode: mode,
        invalid: invalidCallback,
        valid: validCallback,
        beforeSend: beforeSendCallback,
        success: successCallback,
        error: errorCallback,
        complete: completeCallback,
      });
    });
  });
});
