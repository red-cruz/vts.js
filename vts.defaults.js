'use strict';

/**
 * Global default configuration of vts - Validate Then Submit
 * @memberof Vts
 * @type {Object}
 */
export default vtsDefaults = {
  /**
   * Ajax settings
   */
  ajax: {
    /**
     * Ajax beforeSend callback function
     * @param {XMLHttpRequest} xhr - The XMLHttpRequest object
     */
    beforeSend: (xhr) => {},

    /**
     * Ajax complete callback function
     * @param {XMLHttpRequest} xhr - The XMLHttpRequest object
     * @param {string} textStatus - The status of the request ("success", "error", "timeout", etc.)
     */
    complete: (xhr, textStatus) => {},

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
