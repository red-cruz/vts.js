'use strict';

/**
 * Global default configuration for Vts (Validate Then Submit).
 *
 * @type {import("../types").VtsConfig}
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

export { vtsDefaults };
