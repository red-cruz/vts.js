import type { VtsRuleMessage, VtsRules } from './rules';

/**
 * Represents the configuration options for Vts (Validate Then Submit).
 */
interface VtsConfig {
  /**
   * The Ajax settings for form submission.
   */
  ajax: Partial<VtsAjaxSettings>;
  /**
   * The function to call for all valid fields.
   * @param data The validation data for all valid fields.
   * @param form The HTML form element.
   */
  fnValid: (
    data: { [fieldName: string]: VtsValidationData<string> },
    form: HTMLFormElement
  ) => void;
  /**
   * The function to call for invalid fields.
   * @param data The validation data for all invalid fields.
   * @param form The HTML form element.
   */
  fnInvalid: (
    data: { [fieldName: string]: VtsValidationData<string> },
    form: HTMLFormElement
  ) => void;
  /**
   * Determines whether to halt the form submission if there are invalid fields.
   * @default false
   */
  halt: boolean;
  /**
   * Determines whether to add event listeners for fields on submit event.
   * @default false
   */
  listen: boolean;
  /**
   * The validation rules for the form fields.
   * @default {}
   */
  rules: VtsRules | Map<string, VtsRules[string]>;
  /**
   * The custom validation message configuration.
   * @default {}
   */
  message: Partial<VtsRuleMessage>;
  /**
   * Determines whether to stop event propagation on form submission.
   * @default true
   */
  stopPropagation: boolean;
  /**
   * The CSS class to apply to the form when it has been validated.
   * @default 'was-validated'
   */
  validatedClass: string;
}

/**
 * Represents the validation data for form fields in Vts (Validate Then Submit).
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

/**
 * Represents the Ajax settings for form submission in Vts (Validate Then Submit).
 */
interface VtsAjaxSettings {
  abortController: AbortController;
  /**
   * The URL action for the form submission.
   *
   * default -  The value of the form attribute `action`
   */
  action: string;
  /**
   * The request options for the Ajax call.
   * @default
   *   {
   *    'Content-Type': 'multipart/form-data',
   *   }
   */
  request: RequestInit;
  /**
   * A function to be called before the Ajax request is sent.
   * @param requestInit
   * @param abortController The `AbortController` associated with the request.
   * @param form The HTML form element being submitted.
   */
  beforeSend: (
    requestInit: RequestInit,
    abortController: AbortController,
    form: HTMLFormElement
  ) => void | RequestInit;
  /**
   * A function to be called when the Ajax request is complete.
   * @param form The HTML form element that was submitted.
   */
  complete: (form: HTMLFormElement) => void;
  /**
   * A function to be called when an error occurs during the Ajax request.
   * @param error The error object or message.
   * @param raw The raw error response.
   * @param form The HTML form element that was submitted.
   */
  error: (
    error: any | null,
    raw: Response | Error,
    form: HTMLFormElement
  ) => void;
  /**
   * A function to be called when the Ajax request is successful.
   * @param data The response data, parsed into a JavaScript object from the JSON input.
   * @param response The raw response object.
   * @param form The HTML form element that was submitted.
   */
  success: (data: any, response: Response, form: HTMLFormElement) => void;
}

export type { VtsConfig, VtsValidationData, VtsAjaxSettings };
