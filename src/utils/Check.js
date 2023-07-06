const instances = [];

export default class CheckUtil {
  /**
   * Checks if there is an existing "Vts" instance associated with the provided form ID.
   * Throws an error if an instance already exists for the form ID.
   * If no instance exists, it adds the form ID to the instances array.
   *
   * @param {string} formId - The ID of the form element to check for an existing instance.
   * @throws {Error} Throws an error if an instance already exists for the specified form ID.
   */
  static instance(formId) {
    // Check if an instance already exists for the form ID
    if (instances.includes(formId)) {
      throw new Error(
        `A "Vts" instance already exists for the specified form element: ${formId}`
      );
    }

    // Add the form ID to the instances array
    instances.push(formId);
  }

  /**
   * Checks if the provided form element is valid and throws an error if it is not.
   *
   * @param {HTMLFormElement} form The object representing the context of the function.
   * @throws {TypeError} Throws a TypeError if the form element is not found or is not a valid HTML form element.
   */
  static form(form) {
    const formId = form.id;

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
  }
}
