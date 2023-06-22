'use strict';

/**
 * Global default configuration for Vts (Validate Then Submit).
 *
 */
const vtsDefaults = {
  /**
   * Stops the form's submission.
   * @type {Boolean}
   */
  halt: false,

  /**
   * Ajax settings
   */
  ajax: {
    request: {},

    /**
     * Ajax beforeSend callback function
     * @param {XMLHttpRequest} xhr - The XMLHttpRequest object
     */
    beforeSend: () => {
      vtsDefaults.ajax.loader();
    },

    loader: (percent) => {},

    complete: (xhr, textStatus) => {},

    error: (error, raw) => {
      console.table(raw);
      alert(error || raw);
    },

    /**
     * ajax success
     * @param {object} data
     * @param {object} response
     */
    success: (data, response) => {
      alert(data.title + ':\n' + data.text);
    },
  },
  /**
   * A function to be called if the field is invalid.
   * @param {HTMLElement} currentField
   * @param {String} label
   */
  fnInvalid: (currentField, label, title, message) => {
    currentField.focus();
    currentField.style.border = '1px solid red';
    alert(title + '\n' + message);
  },

  /**
   * Whether to log the validation errors.
   * @type {boolean}
   */
  log: false,

  /**
   * The validation mode.
   * The "each" mode will stop the validation if the current field is invalid.
   * The "all" mode will continue the validation until all fields have been checked.
   * Fields are validated in the same order as their DOM declaration.
   * @type {string}
   * @default 'all'
   */
  mode: 'all',
  stopPropagation: true,
  /**
   * regular expressions
   * @type {Object}
   */
  rules: {},

  /**
   * A function to be called if the field is valid.
   * @param {HTMLElement} currentField
   * @param {String} label
   */
  fnValid: function (currentField) {
    currentField.style.border = '1px solid green';
  },
};

export default vtsDefaults;
