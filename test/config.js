// @ts-check
import Swal from 'sweetalert2';
import Vts, { VtsRulesMixin } from '../src/ValidateThenSubmit';
// import Vts from '../dist/ValidateThenSubmit';

document.addEventListener('DOMContentLoaded', function () {
  const test = new Vts('myForm', {
    log: true,
    validatedClass: 'was',
  });

  console.log(test);
});

// VTS GLOBAL CONFIGURATION
const defaultMessage = {
  valid: '${value} is a valid ${label} ${label}',
  invalid: '${label} must be equal to ${targetLabel} ${target}',
};
Vts.setDefaults({
  // AJAX EVENTS
  ajax: {
    beforeSend: (abortController, form) => {
      Swal.fire({
        title: 'Loading',
        icon: 'info',
        text: 'Please wait.',
        allowOutsideClick: false,
      });
    },
    success: function (data, response, form) {
      Swal.fire({
        title: data.title ?? 'Server connection: ' + response.statusText,
        html: data.text,
        icon: data.icon ?? 'info',
      });
      form.classList.remove('was-validated');
      form.reset();
    },
    complete: completeSwal,
    error: function (errorData, errorResponse, form) {
      const data = errorData ? errorData : {};
      const stack =
        'stack' in errorResponse
          ? errorResponse.stack
          : 'Unknown error occurred';

      console.table(errorResponse);

      Swal.fire({
        title: data.title || 'Error!',
        html: data.text || stack,
        icon: data.icon || 'error',
        showCancelButton: true,
        cancelButtonText: 'View Error',
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel) {
          var newWindow = window.open();
          if (newWindow) newWindow.document.body.innerHTML = data.text || stack;
        }
      });
    },
  },
});

// set rules
Vts.setDefaults({
  rules: {
    first_name: {
      match: 'user_name',
      message: defaultMessage,
    },
    last_name: {
      match: 'first_name',
      pattern: 'test',
      message: {
        invalid: 'MALI',
        validityState: {
          valueMissing: 'Required po',
        },
      },
    },
  },
});

function completeSwal(form) {
  console.log('triggered final');

  // empty function for disabling [vts] default complete function
  // can be configured
}
