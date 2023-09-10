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
   * Checks the field element in the form and validates its type.
   * Throws an error if the field element is not found or is not a valid field element.
   *
   * @param {HTMLFormElement} form - The HTML form element.
   * @param {string} fieldName - The name of the field element.
   * @returns {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} - The validated field element.
   * @throws {TypeError} Throws a TypeError if the field element is not found or is not a valid field element.
   */
  static validateField(form, fieldName) {
    const field = form.querySelector(`[name="${fieldName}"]`);

    // Check if field element exists
    if (!field) {
      throw new TypeError(
        `The field element with the name "${fieldName}" was not found in the form.`
      );
    }

    // Check if field element is a valid field element
    if (
      !(
        field instanceof HTMLInputElement ||
        field instanceof HTMLSelectElement ||
        field instanceof HTMLTextAreaElement
      )
    ) {
      throw new TypeError(
        `The element with name "${fieldName}" is not a valid field element. 
      Please ensure you are passing the name of a valid field in the form.`
      );
    }

    return field;
  }
}

/**
 * Check if form element is a valid HTML form element
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
  return element;
}
