'use strict';

/**
 * Global default configuration for Vts (Validate Then Submit).
 *
 * @typedef {Object} VtsDefaults
 * @property {Boolean} halt - Stops the form's submission.
 * @property {Object} ajax - Ajax settings.
 * @property {Object} ajax.request - Ajax request settings.
 * @property {Function} ajax.beforeSend - Ajax beforeSend callback function.
 * @property {Function} ajax.complete - Ajax complete callback function.
 * @property {Function} ajax.error - Ajax error callback function.
 * @property {Function} ajax.success - Ajax success callback function.
 * @property {Function} fnInvalid - A function to be called if the field is invalid.
 * @property {Boolean} log - Whether to log the validation errors.
 * @property {Boolean} stopPropagation - Whether to stop event propagation.
 * @property {Object} rules - Regular expressions for validation rules.
 * @property {Function} fnValid - A function to be called if the field is valid.
 */

/**
 * Global default configuration for Vts (Validate Then Submit).
 *
 * @type {VtsDefaults}
 */
const vtsDefaults = {
  halt: false,
  validatedClass: 'was-validated',
  ajax: {
    request: {},
    beforeSend: () => {
      vtsDefaults.ajax.loader();
    },
    complete: (xhr, textStatus) => {},
    error: (error, raw) => {
      console.table(raw);
      alert(error || raw);
    },
    success: (data, response) => {
      alert(data.title + ':\n' + data.text);
    },
  },
  fnInvalid: (currentField, label, title, message) => {
    currentField.focus();
    currentField.style.border = '1px solid red';
    alert(title + '\n' + message);
  },
  log: false,
  stopPropagation: true,
  rules: {},
  fnValid: function (currentField) {
    currentField.style.border = '1px solid green';
  },
};

export default vtsDefaults;
