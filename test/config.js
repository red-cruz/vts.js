import Swal from 'sweetalert2';
import Vts, { setVtsDefaults } from '../src/ValidateThenSubmit';

// VTS GLOBAL CONFIGURATION
const defaultMessage = {
  valid: '${value} is a valid ${label}',
  invalid: '${label} must be equal to ${targetLabel}',
};
setVtsDefaults({
  ajax: {
    beforeSend: beforeSwal,
    success: successSwal,
    complete: completeSwal,
    error: errorSwal,
  },
  fnValid: (data) => {
    showFeedback('valid', data);
  },
  fnInvalid: (data) => {
    showFeedback('invalid', data);
  },
});

// set rules
setVtsDefaults({
  rules: {
    first_name: {
      match: 'user_name',
      flags: 'g',
      message: defaultMessage,
    },
    last_name: {
      match: 'first_name',
      message: defaultMessage,
    },
  },
});

function showFeedback(state, data) {
  Object.keys(data).forEach((key) => {
    const { field, label, message } = data[key];
    /** @type {HTMLElement} */
    const parent = field.parentNode;
    const className = `${state}-feedback`;
    const sibling = parent.querySelector(`.${className}`);

    if (!sibling) {
      if (!message) return;
      const div = document.createElement('div');
      div.classList.add(`${className}`);
      div.textContent = `${message}`;
      parent.appendChild(div);
    } else {
      /* if (message)  */ sibling.textContent = `${message}`;
      // else sibling.remove();
    }
  });
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
  const test = new Vts('myForm', {
    log: true,
  });
  console.log(test);
});
