import Vts from './vts.js';
import vtsDefaults from './defaults.js';
import Swal from 'sweetalert2';
import rulesUtil from './utils/applyRules.js';

// VTS GLOBAL CONFIGURATION
vtsDefaults.rules = {
  first_name: {
    match: 'user_name',
    // pattern: vtsDefaults.generateCaseCombinations('gged'),
    flags: 'i',
    title: 'Invalid yung fname',
    message: 't',
    fn: () => {
      console.log('test');
    },
  },
};
// vtsDefaults.log = true;
const mode = (vtsDefaults.mode = 'each');
vtsDefaults.fnInvalid = mode === 'each' ? invalidSwal : invalidAll;
vtsDefaults.fnValid = mode === 'each' ? validFn : validAll;
vtsDefaults.ajax.beforeSend = beforeSwal;
vtsDefaults.ajax.success = successSwal;
vtsDefaults.ajax.complete = completeSwal;
vtsDefaults.ajax.error = errorSwal;

// validation for "each" mode
function invalidSwal(currentField, label, title, message) {
  console.log(currentField.validationMessage, label);
  currentField.focus();
  Swal.fire({
    title: title,
    text: message || currentField.validationMessage,
    icon: 'warning',
  });
}
function validFn(currentField, label) {
  console.log(label, currentField.value);
  // this empty function prevents the default "valid" method of vts from executing
  // if this is removed, a green border will be applied to the valid inputs
}

// OPTIONAL SETTINGS
// validation for "all" mode
/**
 * @description
 * @author RED
 * @param {NodeListOf<HTMLElement>} invalidFields
 * @param {HTMLFormElement} form
 */
function invalidAll(invalidFields, form) {
  console.log(invalidFields);
  invalidFields.forEach((element) => {
    console.log(element);
  });
  form.classList.add('was-validated');
}
/**
 * @description
 * @author RED
 * @param {NodeListOf<HTMLElement>} validFields
 * @param {HTMLFormElement} form
 */
function validAll(validFields, form) {
  // for (const field of validFields) {
  //   field.style.border = '1px solid green';
  // }
}

// AJAX EVENTS
function beforeSwal(jqXHR, form) {
  Swal.fire({
    title: 'Loading',
    icon: 'info',
    text: 'Please wait.',
    allowOutsideClick: false,
  });
}
/**
 * @description
 * @param {object} data
 * @param {*} response
 */
function successSwal(data, response, form) {
  Swal.fire({
    title: data.title ?? 'Server connection: ' + response.statusText,
    html: data.text,
    icon: data.icon ?? 'info',
  });
  form.classList.remove('was-validated');
  form.reset();
}
function errorSwal(errorData, errorResponse, form) {
  const data = errorData ? errorData : {};
  console.table(errorResponse);

  Swal.fire({
    title: data.title || 'Error!',
    html: data.text || errorResponse.stack,
    icon: data.icon || 'error',
    showCancelButton: true,
    cancelButtonText: 'View Error',
  }).then((result) => {
    if (result.dismiss === 'cancel') {
      var newWindow = window.open();
      newWindow.document.body.innerHTML = data.text || errorResponse.stack;
    }
  });
}
function completeSwal(form) {
  console.log('triggered final');

  // empty function for disabling [vts] default complete function
  // can be configured
}

document.addEventListener('DOMContentLoaded', function () {
  /** @type {HTMLFormElement} */
  const myForm = document.getElementById('myForm');
  myForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const validatedForm = new Vts(myForm, {
      log: true,
      halt: true,
    });

    validatedForm.isValid() &&
      validatedForm
        .submit()
        .then((response) => {
          console.log(validatedForm.isValid());
          if (response instanceof Response) console.log(response.ok, 'ge');
        })
        .finally(() => {
          console.log('tapos lahat');
        });
  });
});
