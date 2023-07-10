import type { VtsRules } from './rules';

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
   * @param currentField The current valid field element.
   * @param form The HTML form element.
   */
  fnValid: (data: VtsValidationData<string>, form: HTMLFormElement) => void;
  /**
   * The function to call for invalid fields.
   * @param currentField The current invalid field element.
   * @param form The HTML form element.
   */
  fnInvalid: (data: VtsValidationData<string>, form: HTMLFormElement) => void;
  /**
   * Determines whether to halt the form submission if there are invalid fields.
   * @default false
   */
  halt: boolean;
  /**
   * Determines whether to log the validation process.
   * @default false
   */
  log: boolean;
  /**
   * The validation rules for the form fields.
   */
  rules: VtsRules | Map<string, VtsRules[string]>;
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
  /**
   * The URL action for the form submission.
   */
  action: string;
  /**
   * The HTTP method for the form submission.
   */
  method: string;
  /**
   * The request options for the Ajax call.
   */
  request: RequestInit;
  /**
   * A function to be called before the Ajax request is sent.
   * @param abortController The `AbortController` associated with the request.
   * @param form The HTML form element being submitted.
   */
  beforeSend: (abortController: AbortController, form: HTMLFormElement) => void;
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
   * @param data The response data.
   * @param response The raw response.
   * @param form The HTML form element that was submitted.
   */
  success: (
    data: any | null,
    response: Response,
    form: HTMLFormElement
  ) => void;
}

/**
 * Sets the default configuration for Vts (Validate Then Submit).
 * @param config The configuration options.
 */
declare function setVtsDefaults(config: Partial<VtsConfig>): void;

export type { VtsValidationData, VtsConfig };
