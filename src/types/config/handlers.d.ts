export default interface VtsHandlers {
  /**
   * The function to call for all valid fields.
   * @param validClass The class name for valid fields.
   * @param validFieldsData The validation data for all valid fields.
   * @example
   * [
   *   'fieldName': {
   *      field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
   *      label: string; // The corresponding label for the validated field.
   *      message: string | undefined; // The valid message.
   *    }...
   * ]
   * @param form The HTML form element.
   *
   */
  valid: (
    validClass: string,
    validFieldsData: VtsValidationData<string>,
    form: HTMLFormElement
  ) => void;

  /**
   * The function to call for invalid fields.
   * @param invalidClass The class name for invalid fields.
   * @param invalidFieldsData The validation data for all invalid fields.
   * @example
   * [
   *   'fieldName': {
   *      field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
   *      label: string; // The corresponding label for the validated field.
   *      message: string; // The invalid message.
   *    }...
   * ]
   * @param form The HTML form element.
   */
  invalid: (
    invalidClass: string,
    invalidFieldsData: VtsValidationData<string>,
    form: HTMLFormElement
  ) => void;
}

/**
 * Represents the validation data for form fields in Vts (Validate Then Submit).
 *
 * The `TFieldNames` type is a generic type that represents the names of the form fields that are being validated.
 */
type VtsValidationData<TFieldNames extends string> = {
  [K in TFieldNames]: {
    /**
     * The validated form field.
     */
    field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

    /**
     * The corresponding label for the validated field.
     */
    label: string;

    /**
     * The validation message.
     */
    message: string | undefined;
  };
};
