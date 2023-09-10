interface VtsHandlers {
  /**
   * The function to call for all valid fields.
   * @param validClass The class name for valid fields.
   * @param data The validation data for all valid fields.
   * @param form The HTML form element.
   */
  valid?: (
    validClass: string,
    data: VtsValidationData<string>,
    form: HTMLFormElement
  ) => void;

  /**
   * The function to call for invalid fields.
   * @param invalidClass The class name for invalid fields.
   * @param data The validation data for all invalid fields.
   * @param form The HTML form element.
   */
  invalid?: (
    invalidClass: string,
    data: VtsValidationData<string>,
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
