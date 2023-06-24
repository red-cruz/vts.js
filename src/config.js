import Vts from './vts.js';
import vtsDefaults from './defaults.js';
import Swal from 'sweetalert2';

// VTS GLOBAL CONFIGURATION
vtsDefaults.rules = {
  first_name: {
    eventType: 'input',
    pattern: '\\d',
    flags: 'i',
    valid: {
      title: 'Tama na',
      message: 'Oks yung ${value}',
      fn: (Vts) => {},
    },
    invalid: {
      title: 'Invalid yung ${value}',
      message: 'Ehhhh',
      fn: (Vts) => {},
    },
  },
};
vtsDefaults.log = true;
vtsDefaults.fnInvalid = invalidAll;
vtsDefaults.fnValid = validAll;
vtsDefaults.ajax.beforeSend = beforeSwal;
vtsDefaults.ajax.success = successSwal;
vtsDefaults.ajax.complete = completeSwal;
vtsDefaults.ajax.error = errorSwal;

// validation SETTINGS
/**
 * @description
 * @author RED
 * @param {NodeListOf<HTMLElement>} invalidFields
 * @param {HTMLFormElement} form
 */
function invalidAll(invalidFields, form) {
  invalidFields.forEach((element) => {
    const parent = element.parentElement;
    const className = 'invalid-feedback';
    const sibling = parent.querySelector(`.${className}`);

    // Check if a sibling element exists
    if (sibling === null) {
      const div = document.createElement('div');
      div.classList.add(className);
      div.append(element.validationMessage);
      element.parentElement.append(div);
    } else {
      // Sibling element does not exist
      // return false;
    }
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
  validFields.forEach((element) => {
    const parent = element.parentElement;
    const className = 'valid-feedback';
    const sibling = parent.querySelector(`.${className}`);

    // Check if a sibling element exists
    if (sibling === null) {
      const div = document.createElement('div');
      div.classList.add(className);
      div.append('oks');
      element.parentElement.append(div);
    } else {
      // Sibling element does not exist
      // return false;
    }
  });
}

// AJAX EVENTS
/**
 * @description
 * @param {AbortController} abortController
 * @param {HTMLFormElement} form
 */
function beforeSwal(abortController, form) {
  Swal.fire({
    title: 'Loading',
    icon: 'info',
    text: 'Please wait.',
    allowOutsideClick: false,
    showCancelButton: true,
  }).then((result) => {
    if (result.dismiss === 'cancel') {
      abortController.abort();
    }
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
  if (errorResponse instanceof DOMException) {
    data.title = 'aborted';
    data.text = errorResponse.message;
  }
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
  const form = document.getElementById('myForm');
  const myForm = new Vts('myForm', {
    log: true,
    // halt: true,
  });
  return;
  form.addEventListener('submit', function (e) {
    // e.preventDefault();
    if (myForm.isValid()) myForm.submit();
  });

  /** @type {HTMLFormElement} */
  const myForm1 = document.getElementById('myForm');
  myForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const validatedForm = new Vts('myForm', {
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
