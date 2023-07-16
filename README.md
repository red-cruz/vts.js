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

  - Default: The Form's action attribure.

- `beforeSend`: Function - Called before the Ajax request is sent. It receives the **_ajax.request_** object, the **_AbortController_** associated with the request, and the HTML **_form_** element being submitted. It can modify the request object or perform additional actions before the request is sent.

  - Example:
    ```javascript
    beforeSend: (request, abortController, form) => {
      request.method = 'post';
      // request must be returned for the modifications to take effect
      return request;
    };
    ```

- `complete`: Function - called when the Ajax request is complete. It receives the HTML **_form_** element that was submitted. This function can be used to perform any cleanup or finalization tasks after the request is completed.

- `error`: Function - called when an error occurs during the Ajax request. It receives the response, parsed into a JavaScript **_object_**; the raw error **response** object; and the HTML **_form_** element that was submitted. This function can handle error cases and provide appropriate feedback to the user.

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

### `class`: Object - The CSS classes to be applied.

- `form`: String - The CSS class to apply to the form when it has been validated.
  - Default: 'was-validated'
- `invalid`: String - The CSS class to apply to the created `div` sibling of an invalid field.
  - Default: 'invalid-feedback'
    > This property is disregarded if the default handlers are overwritten.
- `valid`: String - The CSS class to apply to the created `div` sibling of a valid field.
  - Default: 'valid-feedback'
    > This property is disregarded if the default handlers are overwritten.

`halt`: Boolean - Stops the form's submission.
`rules`: Object - Regular expressions for custom validation rules.

Refer to the [API Reference](api-reference.md) for detailed information on each configuration option and its usage.

## Defaults

The defaults can be modified using the static [`Vts.setDefaults()`](#setDefaults).

### setDefaults

This static method accepts one argument, the configurations object. This mutates the defaults object.

## Sample Usage

Here's an example that demonstrates the usage of Vts with custom configuration options:

```

const form = document.getElementById('myForm');
const vtsConfig = {
class: {
valid: 'custom-valid-class',
invalid: 'custom-invalid-class'
},
halt: true,
invalid: (currentField, label, title, message) => {
currentField.classList.add('error');
console.error(`Invalid field: ${label}. Error: ${message}`);
},
log: true,
mode: 'all',
rules: {
customRule: /^[A-Z]{3}$/
},
trim: false,
valid: (currentField) => {
currentField.classList.remove('error');
console.log('Field is valid');
}
};

form.addEventListener('submit', (e) => {
e.preventDefault();
new Vts(form, vtsConfig);
});

```

In the above example, we customize the class names for valid and invalid fields, enable halting the form submission on invalid fields, define a custom invalid handler function, enable logging, set the validation mode to "all", define a custom validation rule, disable trimming of input values, and define a custom valid handler function.

Adjust the configuration options according to your specific requirements.

### API Reference

The API reference section provides detailed information about the available classes, methods, and configuration options in Vts. It explains how to customize the validation rules, error handling, and more. Please refer to the [API Reference](api-reference.md) for more information.

### Examples

The Examples section showcases various use cases and provides code snippets to help you understand how to use Vts in different scenarios. It covers common validation scenarios, custom rule definitions, and handling form submission events. Please refer to the [Examples](examples.md) for more information.

### FAQ

The FAQ section answers frequently asked questions about Vts. It provides solutions to common issues and addresses potential concerns you may have when using the library. Please refer to the [FAQ](faq.md) for more information.

```

```
