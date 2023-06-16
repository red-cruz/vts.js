import Vts from './vts.js';
import vtsDefaults from './vts.defaults.js';
import Swal from 'sweetalert2';

// VTS GLOBAL CONFIGURATION
window.testing = vtsDefaults;
vtsDefaults.log = true;
vtsDefaults.fnInvalid = invalidSwal;
vtsDefaults.fnValid = validFn;

vtsDefaults.ajax.beforeSend = beforeSwal;
vtsDefaults.ajax.success = successSwal;
vtsDefaults.ajax.complete = completeSwal;
vtsDefaults.ajax.error = errorSwal;
vtsDefaults.mode = 'each';
// validation for "each" mode
function invalidSwal(currentField, label, title, message) {
  console.log(label);
  currentField.focus();
  Swal.fire({
    title: title,
    text: message,
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
 */
function invalidAll(invalidFields) {
  for (const field of invalidFields) {
    field.style.border = '1px solid red';
  }
}
/**
 * @description
 * @author RED
 * @param {NodeListOf<HTMLElement>} validFields
 */
function validAll(validFields) {
  for (const field of validFields) {
    field.style.border = '1px solid green';
  }
}

// AJAX EVENTS
function beforeSwal(jqXHR) {
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
function successSwal(data, response) {
  console.log(typeof data, response instanceof Response);
  Swal.fire({
    title: data.title ?? 'Server connection: ' + response.statusText,
    html: data.text,
    icon: data.icon ?? 'info',
  });
}
function errorSwal(errorData, errorResponse) {
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
function completeSwal(jqXHR, textStatus) {
  // empty function for disabling [vts] default complete function
  // can be configured
}

document.addEventListener('DOMContentLoaded', function () {
  const myForm = document.getElementById('myForm');
  myForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const test = new Vts('myForm', {
      log: true,
    });
  });
});
