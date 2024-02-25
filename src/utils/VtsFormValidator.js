// @ts-check

/**
 * Utility class for form type validation and instance checking.
 * @abstract
 */
export default class VtsFormValidator {
  /**
   * Retrieves the form element with the provided form ID and checks its validity.
   *
   * @param {string|HTMLElement} form - The ID of the form or the form element to retrieve and check.
   * @returns {HTMLFormElement} The valid HTML form element.
   * @throws {TypeError} Throws a TypeError if the form element is not found or is not a valid HTML form element.
   */
  static validateForm(form) {
    let _form;
    if (typeof form === 'string') {
      _form = document.getElementById(form);

      // Check if form element exists
      if (!_form) {
        throw new TypeError(
          `The form element with ID "${form}" was not found.`
        );
      }
    } else _form = form;

    return checkHTMLFormInstance(_form);
  }

  /**
   * Checks and gets the field element in the form.
   *
   * @param {HTMLFormElement} form - The HTML form element.
   * @param {string} fieldName - The name of the field element.
   * @returns {import("../types/core").VtsField } - The validated field element.
   */
  static validateField(form, fieldName) {
    const field = form.querySelector(`[name="${fieldName.split(' ')[0]}"]`);

    // Check if field element is a valid field element
    if (
      !(
        field instanceof HTMLInputElement ||
        field instanceof HTMLSelectElement ||
        field instanceof HTMLTextAreaElement
      )
    ) {
      throw `${fieldName} is not a valid field.`;
    }

    return field;
  }
}

/**
 * Check if form element is a valid HTML form element and returns the form with the novalidate property set to `true`
 *
 * @param {HTMLElement} element
 * @returns {HTMLFormElement}
 * @throws {TypeError} Throws a TypeError if the form element is not a valid HTML form element.
 */
function checkHTMLFormInstance(element) {
  if (!(element instanceof HTMLFormElement)) {
    const formId = element?.getAttribute('id');
    const msg =
      (formId ? `with ID "${formId}"` : `"${element?.tagName}"`) || '';

    throw new TypeError(`The element ${msg} is not a valid HTML form element.`);
  }
  element.noValidate = true;

  return element;
}
