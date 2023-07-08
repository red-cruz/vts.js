const instances = [];

/**
 * Utility class for form type validation and instance checking.
 */
export default class VtsFormValidator {
  /**
   * Checks if there is an existing instance associated with the provided form ID.
   * Throws an error if an instance already exists for the form ID.
   * If no instance exists, it adds the form ID to the instances array.
   *
   * @param {string} formId - The ID of the form element to check for an existing instance.
   * @throws {Error} Throws an error if an instance already exists for the specified form ID.
   */
  static checkInstance(formId) {
    // Check if an instance already exists for the form ID
    if (instances.includes(formId)) {
      throw new Error(
        `An instance already exists for the specified form element: ${formId}`
      );
    }

    // Add the form ID to the instances array
    instances.push(formId);
  }

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
}
