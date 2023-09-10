import type VtsConfig from './types/config';
import VtsAjaxSettings from './types/config/ajaxSettings';
import VtsHandlers from './types/config/handlers';
import { VtsRuleMessage, VtsRules } from './types/config/rules';

/**
 * A JavaScript library that provides a simple and flexible way to handle
 * form validation before submitting. It allows you to customize the validation rules,
 * error messages, and actions to be performed when a form field is valid or invalid.
 *
 * @author RED
 * @version 1.1
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
  handlers: VtsHandlers;
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
   * Gets the instance of Vts for the specified form ID.
   * @param formId The ID of the form.
   * @returns The instance of Vts for the specified form ID, or undefined if the instance does not exist.
   */
  static getInstance(formId: string): Vts | undefined;

  /**
   * Gets or creates an instance of Vts (Validate Then Submit) for the specified form ID.
   * @param formId The ID of the form.
   * @param config The configuration options.
   * @returns The instance of Vts for the specified form ID.
   */
  static getOrCreateInstance(formId: string, config?: VtsConfig): Vts;

  /**
   * Removes the instance of Vts (Validate Then Submit) for the specified form ID.
   * @param formId The ID of the form.
   * @returns True if the instance was removed, false otherwise.
   */
  static removeInstance(formId: string): boolean;

  /**
   * Gets the data from the response.
   *
   * This is a static method that asynchronously gets the data from the response.
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
   * Formats an error response from the server.
   *
   * @param data The parsed data from the server.
   * @param response The response from the server.
   * @returns {Object} An object with the title and message of the error.
   */
  static formatResponse(
    data: any,
    response: Response | null
  ): { title: string; message: string };
}

export default Vts;
