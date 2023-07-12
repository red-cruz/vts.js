// @ts-check
import Swal from 'sweetalert2';
import Vts, { VtsRulesMixin } from '../src/ValidateThenSubmit';
// import Vts from '../dist/ValidateThenSubmit';

document.addEventListener('DOMContentLoaded', function () {
  const test = new Vts('myForm');
  console.log(test);
});

// VTS GLOBAL CONFIGURATION
Vts.setDefaults({
  // AJAX EVENTS
  ajax: {
    beforeSend: (request, form) => {
      Swal.fire({
        title: 'Loading',
        icon: 'info',
        text: 'Please wait.',
        allowOutsideClick: false,
      });
      request.method = 'post';
      return request;
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
    complete: (form) => {},
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
  message: {
    valid: 'validd',
    invalid: 'invalidd',
    // valid: '${value} is a valid ${label} ${targetLabel} ${targetValue}',
    // invalid: '${label} ${value} must be equal to ${targetLabel} ${targetValue}',
    valueMissing: 'required po ito',
  },
  rules: {
    first_name: {
      match: 'user_name',
    },
    last_name: {
      match: 'first_name',
      message: {
        valid: 'oks na',
      },
    },
  },
});
