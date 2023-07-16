# Vts Documentation

Welcome to the documentation for Vts - Validate, then submit form. This documentation provides an overview of the Vts library, its features, and how to use it in your web projects.

## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Getting Started](#getting-started)
4. [Configuration Options](#configuration-options)
5. [Sample Usage](#sample-usage)
6. [API Reference](#api-reference)
7. [Examples](#examples)
8. [FAQ](#faq)
9. [Contributing](#contributing)
10. [License](#license)

---

## Introduction

Vts is a JavaScript library that provides a simple and flexible way to handle form validation before submitting. It allows you to customize the validation rules, error messages, and actions to be performed when a form field is valid or invalid.

## Installation

You can install Vts using one of the following methods:

### CDN

Include the Vts library in your HTML file using a CDN link:

```html
<script src="https://cdn.example.com/vts-form.min.js"></script>
```

### NPM

If you are using a module bundler like Webpack or Rollup, you can install Vts from npm:

```bash
npm install vts-form
```

Import the library into your JavaScript file:

```javascript
import Vts from 'vts-form';
```

## Getting Started

To use Vts, you need to include the library in your project, initialize it, and ensure that the form has a `novalidate` attribute. Here's an example of how to get started:

1.  Add the `novalidate`, `method`, and `action` attributes to your form:

    ```html
    <form id="myForm" method="POST" action="/submit-url" novalidate>
      <!-- Your form fields and submit button -->
    </form>
    ```

2.  Initialize `Vts` and pass the form's id

    ```javascript
    new Vts('myForm');
    ```

    In the above example, we assume that you have a form with the ID `myForm`. Replace it with the ID of your actual form. The `novalidate` attribute on the form disables the browser's default form validation. This allows Vts to handle the validation instead.

3.  Optionally, configure the default Vts settings. You can set the action and request properties of the ajax object to specify the URL and additional request parameters.

    ```javascript
    Vts.setDefaults({
      ajax: {
        action: '/default-submit-url',
        request: {
          method: 'POST',
          headers: {
            'X-CSRF-TOKEN': document
              .querySelector('meta[name="csrf-token"]')
              .getAttribute('content'),
          },
        },
      },
    });
    ```

    You can also define the `beforeSend`, `success`, `complete`, and `error` functions to handle the different stages of the Ajax request.

    ```javascript
    Vts.setDefaults({
      ajax: {
        beforeSend: (request, abortController, form) => {
          // Perform any necessary actions before sending the request
          // For example, show a loading spinner or disable form elements
          // You can access the request object and the form element here
          // Return the updated request object
          return request;
        },
        success: (data, response, form) => {
          // Handle the successful response
          // You can access the returned data, the raw response object, and the form element here
        },
        complete: (form) => {
          // Handle the completion of the request
          // This function will be called regardless of success or failure
          // You can perform any cleanup or additional actions here
        },
        error: (errorData, errorResponse, form) => {
          // Handle the error response
          // You can access the error data from server, the raw error response object, and the form element here
        },
      },
    });
    ```

By following these steps, you will be able to perform form validation and asynchronous form submission easily. Adjust the configuration options according to your specific requirements.

## Configuration Options

Each instance of Vts can be configured by passing the configuration object as the second argument.

> The defined properties will overwrite the respective properties in the [defaults](#Defaults).

```javascript
new Vts('myForm', {
  rules: {
    password_confirmation: {
      match: 'password',
      message: {
        invalid: '${label} must match ${targetLabel}',
      },
    },
  },
});
```

Vts provides several configuration options to customize its behavior. Here are the available options:

### `ajax`: Object - represents the Ajax settings for form submission.

- `action`: String - The URL action for the form submission.

  - Default: The value of the form's action attribute.

- `beforeSend`: Function - Called before the Ajax request is sent. It receives the **_ajax.request_** object, the **_AbortController_** associated with the request, and the HTML **_form_** element being submitted. It can modify the request object or perform additional actions before the request is sent.

  - Default:

    ```javascript
    beforeSend: (requestInit, abortController, form) => {};
    ```

  - Example:
    ```javascript
    beforeSend: (requestInit, abortController, form) => {
      requestInit.method = 'post';
      // requestInit must be returned for the modifications to take effect
      return requestInit;
    };
    ```

- `complete`: Function - called when the Ajax request is complete. It receives the HTML **_form_** element that was submitted. This function can be used to perform any cleanup or finalization tasks after the request is completed.

  - Default:

    ```javascript
    complete: (form) => {};
    ```

- `error`: Function - called when an error occurs during the Ajax request. It receives the response, parsed into a JavaScript **_object_**; the raw error **response** object; and the HTML **_form_** element that was submitted. This function can handle error cases and provide appropriate feedback to the user.

  - Default:

    ```javascript
    error: (errorData, errorResponse, form) => {
      const data = errorData ? errorData : {};
      const title =
        'message' in errorResponse ? errorResponse.message : 'Error!';
      const html =
        'stack' in errorResponse
          ? errorResponse.stack
          : 'Unknown error occurred';
      const text = data.title || title;
      if (confirm(text + ':\n' + 'Click "ok" to view more details.')) {
        const newWindow = window.open();
        if (newWindow) newWindow.document.body.innerHTML = data.html ?? html;
      }
      console.table(errorResponse);
    };
    ```

- `request`: RequestInit - The request options for the Ajax call. It is an object with various options for configuring the request, such as headers, body, etc.

  - Default:
    ```javascript
    request: {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
    ```

- `success`: Function - called when the Ajax request is successful. It receives the response, parsed into a JavaScript **_object_**; the raw **response** object; and the HTML **_form_** element that was submitted. This function can process the response data and perform any necessary actions based on the success of the request.

  - Default:

    ```javascript
    success: (data, response, form) => {
      form.reset();
      form.classList.remove('was-validated');
      alert(data.title + ':\n' + data.text);
    };
    ```

### `class`: Object - The CSS classes to be applied.

- `form`: String - The CSS class to apply to the form when it has been validated.
  - Default: `'was-validated'`
- `invalid`: String - The CSS class to apply to the created `div` sibling of an invalid field.
  - Default: `'invalid-feedback'`
    > This property is disregarded if the default handlers are overwritten.
- `valid`: String - The CSS class to apply to the created `div` sibling of a valid field.
  - Default: `'valid-feedback'`
    > This property is disregarded if the default handlers are overwritten.

### `halt`: Boolean - Determines whether to halt the form's submission.

- Default: `false`

When the `halt` property is set to `true`, the form's submission will be halted, and you need to add an event listener to the form's `submit` event. Inside the event handler, you can perform additional actions or validations before manually calling the `Vts.submit()` method to submit the form.

- Example:

  ```javascript
  const vtsForm = new Vts('myForm', { halt: true });
  vtsForm.form.addEventListener('submit', () => {
    // There is no need to call `Event.preventDefault()` since it has already been called during the instantiation of Vts.
    if (vtsForm.isFormValid()) {
      vtsForm.submit(); // Manually submit the form
    }
  });
  ```

  In the example above, the submit event listener is added to the form's submit event. Inside the event handler, the `Vts.isFormValid()` method is called to check if all form fields are valid. If they are, the `submit()` method of the Vts instance is called to manually submit the form.

### `handlers`: Object - Contains functions for handling field validation.

- `invalid`: Function - The function to call for all invalid fields. This function is responsible for handling the validation feedback for invalid fields.

  - default:

    ```javascript
    invalid: (data, form) => {
      showFeedback('invalid', data);
    };
    ```

  The invalid method receives two parameters:

  1. `data`: An object containing validation data for all `invalid fields`. The `keys` for each validation data object are the value of the `name` attribute of the validated field. Each field's validation data contains the following properties:

     - `field`: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement - The invalid form field.
     - `label`: string - The corresponding label for the invalid field. It is derived from the following sources, in order of priority:
       - The value of the `vts-label` attribute, if defined on the field.
       - The text content of the `<label>` element associated with the field's `id`.
       - The value of the field's `placeholder` attribute.
       - An `empty string` if none of the above are defined.
     - `message`: string - The validation message for the field. By default, it is set to the field's `validationMessage` property. If a custom validation rule is defined for the field, the default message will be `'Invalid ${label}'`.

     ```typescript
     {
       'field_name': {
         field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
         label: string,
         message: string
       },
       // other validation data...
     }
     ```

  2. `form`: The HTML `form` element that was submitted.

- `valid`: Function - The function to call for all valid fields. This function is responsible for handling the validation feedback for valid fields.

  - default:

    ```javascript
    valid: (data, form) => {
      showFeedback('valid', data);
    };
    ```

  The valid method receives two parameters:

  1. `data`: An object containing validation data for all `valid fields`. The `keys` for each validation data object are the value of the `name` attribute of the validated field. Each field's validation data contains the following properties:

     - `field`: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement - The valid form field.
     - `label`: string - The corresponding label for the valid field. It is derived from the following sources, in order of priority:
       - The value of the `vts-label` attribute, if defined on the field.
       - The text content of the `<label>` element associated with the field's `id`.
       - The value of the field's `placeholder` attribute.
       - An `empty string` if none of the above are defined.
     - `message`: string - The validation message for the field. By default, it is an `empty string`.

  2. `form`: The HTML `form` element that was submitted.

  The `showFeedback()` function iterates over the validation data object and updates the DOM to display the validation messages for each field. It checks if there is already an element with the appropriate feedback class and updates its text content. If no such element exists, it creates a new \<div> element and appends it to the parent element.

  ```javascript
  function showFeedback(state, data) {
    for (const key in data) {
      const { field, label, message = ' ' } = data[key];
      const parent = field.parentNode;
      const className = `${state}-feedback`;
      const sibling = parent?.querySelector(`.${className}`);
      if (sibling) {
        sibling.textContent = `${message}`;
      } else {
        const div = document.createElement('div');
        div.classList.add(`${className}`);
        div.textContent = `${message}`;
        parent?.append(div);
      }
    }
  }
  ```

> Note that the `showFeedback()` function mentioned is a default implementation and **cannot be accessed or modified**. However, you can create your own function or use your preferred approach for handling validation feedback within the `invalid` and `valid` handlers.

### `listen`: Boolean - Determines whether to add event listeners to each fields immediately on Vts instantiation.

- Default: `false`

When the `listen` property is set to `true`, event listeners will be added to each field **immediately** upon Vts instantiation. This allows for immediate validation as the user interacts with the form fields.

If the `listen` property is set to `false`, event listeners will be added to each field on the form's **submit event**. This means that the form will be validated and the respective handlers will be executed when the user submits the form. It provides a way to defer the validation until the form is submitted, rather than validating each field as the user interacts with them.

### message

The `message` property enables you to customize the default messages displayed for different validity states of the form fields. You can provide your own messages for each validity state. If a specific validity state's message is undefined, the browser's default custom validation message for that state will be used.

- default:

  ```javascript
  message: {
    invalid: 'Invalid ${label}',
    valid: '',
  }
  ```

Properties:

- `badInput`: The error message for an invalid input. For more information, see the [badInput](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#suffering-from-bad-input) validity state in the WHATWG HTML specification.

- `invalid`: The error message used when a rule is defined on a field.

- `patternMismatch`: The error message for a pattern mismatch. For more information, see the [patternMismatch](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#suffering-from-a-pattern-mismatch) validity state in the WHATWG HTML specification.

- `rangeOverflow`: The error message when the value exceeds the maximum range. For more information, see the [rangeOverflow](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#suffering-from-an-overflow) validity state in the WHATWG HTML specification.

- `rangeUnderflow`: The error message when the value is below the minimum range. For more information, see the [rangeUnderflow](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#suffering-from-an-underflow) validity state in the WHATWG HTML specification.

- `stepMismatch`: The error message for an invalid step. For more information, see the [stepMismatch](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#suffering-from-a-step-mismatch) validity state in the WHATWG HTML specification.

- `tooLong`: The error message when the value is too long. For more information, see the [tooLong](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#suffering-from-being-too-long) validity state in the WHATWG HTML specification.

- `tooShort`: The error message when the value is too short. For more information, see the [tooShort](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#suffering-from-being-too-short) validity state in the WHATWG HTML specification.

- `typeMismatch`: The error message for a type mismatch. For more information, see the [typeMismatch](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#suffering-from-a-type-mismatch) validity state in the WHATWG HTML specification.

- `valueMissing`: The error message when a value is required but not provided. For more information, see the [valueMissing](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#suffering-from-being-missing) validity state in the WHATWG HTML specification.

When customizing error messages, you can use the following `placeholders` to incorporate dynamic values:

- `'${label}'`: Represents the `label` of the field being validated.
- `'${value}'`: Represents the `value` of the field being validated.
- `'${targetLabel}'`: Represents the `label` of the target field when the `match` rule is applied.
- `'${targetValue}'`: Represents the `value` of the target field when the `match` rule is applied.

You can include these placeholders within your custom error messages to provide more specific and informative feedback to the users.

> Note that the placeholders should be treated as `string` literals.

### `rules`: Object - The validation rules for the form fields.

Converted to `Map` containing the field names as keys and the rule definitions as values upon Vts instantiation

### `stopPropagation`: Boolean - Determines whether to stop event propagation on form submission.

- Default: `true`

### setDefaults

This static method accepts one argument, the configurations object. This mutates the defaults object.

### API Reference

The API reference section provides detailed information about the available classes, methods, and configuration options in Vts. It explains how to customize the validation rules, error handling, and more. Please refer to the [API Reference](api-reference.md) for more information.

### Examples

The Examples section showcases various use cases and provides code snippets to help you understand how to use Vts in different scenarios. It covers common validation scenarios, custom rule definitions, and handling form submission events. Please refer to the [Examples](examples.md) for more information.
