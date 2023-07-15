// @ts-checks
import Swal from 'sweetalert2';
import Vts from '../src/ValidateThenSubmit';

document.addEventListener('DOMContentLoaded', function () {
  const test = new Vts('myForm');
  console.log(test);
});

// VTS GLOBAL CONFIGURATION
Vts.setDefaults({
  // AJAX EVENTS
  ajax: {
    beforeSend: (request, abortController, form) => {
      Swal.fire({
        title: 'Loading',
        icon: 'info',
        text: 'Please wait.',
        allowOutsideClick: false,
        showCancelButton: true,
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isDismissed) {
          abortController.abort();
        }
      });
      // request.method = 'post';
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
      const title =
        'message' in errorResponse ? errorResponse.message : 'Error!';
      const html =
        'stack' in errorResponse
          ? errorResponse.stack
          : 'Unknown error occurred';

      if ('name' in errorResponse && errorResponse.name === 'AbortError') {
        Swal.close();
        return;
      }

      console.table(errorResponse);

      Swal.fire({
        title: data.title || title,
        html: data.text ?? html,
        icon: data.icon || 'error',
        showCancelButton: true,
        cancelButtonText: 'View Error',
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel) {
          var newWindow = window.open();
          if (newWindow) newWindow.document.body.innerHTML = data.text || html;
        }
      });
    },
  },
});

// set rules
Vts.setDefaults({
  // message: {
  //   // valueMissing: 'This field is required',
  // },
  rules: {
    first_name: {
      match: 'user_name',
      message: {
        valid: '${value} is a valid ${label}',
        invalid: '${targetValue}, ${targetLabel}',
      },
    },
    // last_name: {
    //   match: 'first_name',
    //   message: {
    //     valid: 'oks na',
    //     invalid: '${targetValue} != ${value}',
    //     valueMissing: 'required po lname',
    //   },
    // },
  },
});
