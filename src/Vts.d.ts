import { VtsValidationResults } from './types/base/validation';
import type VtsConfig from './types/config';
import VtsAjaxSettings from './types/config/ajaxSettings';
import VtsResponseMessage from './types/config/responseMessage';
import { VtsRuleMessage, VtsRules } from './types/config/rules';

/**
 * A JavaScript library that provides a simple and flexible way to handle
 * form validation before submitting. It allows you to customize the validation rules,
 * error messages, and actions to be performed when a form field is valid or invalid.
 *
 * @author RED
 * @version 1.7.3-beta
 */
declare class Vts {
  /**
   * Creates an instance of Vts.
   * @param form form
   * @param config vts configurations
   *
   */
  constructor(form: string | HTMLFormElement, config?: VtsConfig);
  ajax: VtsAjaxSettings;
  class: {
    form: string;
    invalid: string;
    valid: string;
  };
  fields: NodeListOf<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >;
  form: HTMLFormElement;
  halt: boolean;
  /**
   * Handle field feedback.
   */
  renderFeedback: (
    this: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
    message: VtsValidationResults,
    renderClass: string
  ) => void;

  /**
   * Reset the form
   */
  resetForm: () => void;

  /**
   * Checks the validity of the form.
   * @returns {Boolean} True if the form is valid, false otherwise.
   */
  isFormValid(this: Vts): boolean;
  listen: boolean;
  message: VtsRuleMessage;
  rules: Map<string, VtsRules[string]>;
  stopPropagation: boolean;
  /**
   * @description Submits the form via fetch API.
   * @returns A promise that resolves on success or rejects on failure.
   * @async
   */
  submit(this: Vts): Promise<{
    data: any;
    response: Response;
    form: HTMLFormElement;
  }>;

  /**
   * Sets the default configuration for Vts (Validate Then Submit).
   * @param config The configuration options.
   */
  static setDefaults(config: VtsConfig): void;

  /**
   * Asynchronously gets the data from the response.
   *
   * @async
   * @param {Response} response The response object.
   * @returns {Promise<any>} A promise that resolves with the data from the response or rejects with an error.
   *
   * The data is parsed based on *Content-Type*:
   *
   * * `application/json`: the data is parsed as an object using `response.json()`.
   * *  `text/html` or `text/plain`: the data is parsed as a string using `response.text()`.
   * *  If *neither* of the above, the data is `null`.
   */
  static getResponseData(response: Response): Promise<any>;

  /**
   * Extracts title and message from response and formats it
   *
   * Can also get title and message from errors that occurred on the client side,
   * such as when the fetch request throws an `AbortError` or any other error that was thrown in the `before` and `success` ajax callbacks.
   *
   * @param data The parsed data from the server.
   * @param response The response from the server.
   * @param defaultResponseMessages An object with the default title and message for each status code.
   * @returns {{title:string, message: string}} An object with the title and message of the error.
   */
  static getResponseMessage(
    data: any,
    response: Response | null,
    defaultResponseMessages?: VtsResponseMessage
  ): { title: string; message: string };

  /**
   * Retrieves an array of HTML input elements that belong to the same group as the specified field.
   *
   * @param field The field element for which to find the corresponding group.
   * @returns An array of HTML input elements belonging to the same group as the specified field.
   */
  static getGroupedFields(
    field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  ): Array<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
}

export default Vts;
