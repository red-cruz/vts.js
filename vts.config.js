import Vts from './vts.js';

// VTS GLOBAL CONFIGURATION
// window.testing = vtsDefaults;
// vtsDefaults.log = true;
// vtsDefaults.fnInvalid = invalidSwal;
// vtsDefaults.fnValid = validFn;

// vtsDefaults.ajax.beforeSend = beforeSwal;
// vtsDefaults.ajax.success = successSwal;
// vtsDefaults.ajax.complete = completeSwal;
// vtsDefaults.ajax.error = errorSwal;
// vtsDefaults.class.valid = 'test';
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
  console.log(label, currentField.val());
  // this empty function prevents the default "valid" method of vts from executing
  // if this is removed, a green border will be applied to the valid inputs
}

// OPTIONAL SETTINGS
// validation for "all" mode
function invalidAll(invalidFields) {
  $(invalidFields).each(function () {
    $(this).css('border', '1px solid red');
  });
}
function validAll(validFields) {
  console.log(validFields);
  $(validFields).each(function () {
    $(this).css('border', '1px solid green');
  });
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
function successSwal(data, textStatus, jqXHR) {
  Swal.fire({
    title: data.title ?? 'Server connection: ' + textStatus,
    html: data.html ?? jqXHR.responseText,
    icon: data.icon ?? textStatus,
  });
}
function errorSwal(error, jqXHR, textStatus, errorThrown) {
  const customError = error.responseJSON;
  const hasCustomError =
    'responseJSON' in error && 'title' in error.responseJSON;
  let title = hasCustomError
    ? customError.title
    : textStatus + ': ' + error.status;
  if (error.status === 0) title = 'Please check your connection.';
  const html = hasCustomError ? customError.html : errorThrown;
  const icon = hasCustomError ? customError.icon : 'error';
  const cLog = error.responseText;
  Swal.fire({
    title: title,
    html: html,
    icon: icon,
    showCancelButton: true, // comment this on production
    cancelButtonText: 'View Error', // comment this on production
  }).then((result) => {
    if (result.dismiss === 'cancel') {
      var newWindow = window.open();
      newWindow.document.body.innerHTML = cLog;
    }
  });

  console.log(cLog);
}
function completeSwal(jqXHR, textStatus) {
  // empty function for disabling [vts] default complete function
  // can be configured
}

document.addEventListener('DOMContentLoaded', function () {
  const myForm = document.getElementById('myForm');
  myForm.addEventListener('submit', (e) => {
    e.preventDefault();
    new Vts('myForm', {
      log: true,
    });
  });
});
