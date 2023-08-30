// @ts-check

/**
 * Utility class for form type validation and instance checking.
 * @abstract
 */
export default class VtsFormValidator {
  /**
   * Retrieves the form element with the provided form ID and checks its validity.
   *
   * @param {string} formId - The ID of the form element to retrieve and check.
   * @returns {HTMLFormElement} The valid HTML form element.
   * @throws {TypeError} Throws a TypeError if the form element is not found or is not a valid HTML form element.
   */
  static validateForm(formId) {
    const form = document.getElementById(formId);

    // Check if form element exists
    if (!form) {
      throw new TypeError(
        `The form element with ID "${formId}" was not found.`
      );
    }

    // Check if form element is a valid HTML form element
    if (!(form instanceof HTMLFormElement)) {
      throw new TypeError(
        `The element with ID "${formId}" is not a valid HTML form element.
        Please ensure you are passing the ID of a valid form element.`
      );
    }

    return form;
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
