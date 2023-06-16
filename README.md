## Vts Documentation

Welcome to the documentation for Vts - Validate Then Submit. This documentation provides an overview of the Vts library, its features, and how to use it in your web projects.

### Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Getting Started](#getting-started)
4. [Configuration Options](#configuration-options)
5. [Sample Usage](#sample-usage)
6. [API Reference](#api-reference)
7. [Examples](#examples)
8. [FAQ](#faq)

---

### Introduction

Vts is a JavaScript library that provides a simple and flexible way to handle form validation before submitting. It allows you to customize the validation rules, error messages, and actions to be performed when a form field is valid or invalid.

### Installation

To use Vts in your project, you can include the library directly in your HTML file or import it as a module.

#### Direct inclusion in HTML file:

```html
<script src="vts.js"></script>
```

#### Importing as a module:

```html
<script type="module">
  import { Vts } from './vts.js';
  // Your code using Vts
</script>
```

Make sure to adjust the path to the `vts.js` file based on your project's structure.

### Getting Started

To use Vts, you need to include the library in your project, initialize it when submitting the form, and ensure that the form has a `novalidate` attribute. Here's an example of how to get started:

1. Include the Vts library in your HTML file:

   ```html
   <script src="vts.js"></script>
   ```

2. Add the `novalidate` attribute to your form:

   ```html
   <form id="myForm" novalidate>
     <!-- Your form fields and submit button -->
   </form>
   ```

3. Initialize Vts when submitting the form:
   ```javascript
   const form = document.getElementById('myForm');
   form.addEventListener('submit', (e) => {
     e.preventDefault(); // Prevent form submission
     new Vts(form);
   });
   ```

In the above example, we assume that you have a form with the ID `myForm`. Replace it with the ID of your actual form. The `novalidate` attribute on the form disables the browser's default form validation. This allows Vts to handle the validation instead.

### Configuration Options

Vts provides several configuration options to customize its behavior. Here are the available options:

- `ajax`: Object - jQuery Ajax settings for handling form submission via Ajax.
- `class`: Object - The classes to be applied on the validated field.
- `halt`: Boolean - Stops the form's submission.
- `invalid`: Function - A function to be called if the field is invalid.
- `log`: Boolean - Enables logging of validation messages.
- `mode`: String - The validation mode: "each" or "all".
- `rules`: Object - Regular expressions for custom validation rules.
- `trim`: Boolean - Trims the input values before validation.
- `valid`: Function - A function to be called if the field is valid.

Refer to the [API Reference](api-reference.md) for detailed information on each configuration option and its usage.

### Sample Usage

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
