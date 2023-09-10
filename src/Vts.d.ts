import type VtsConfig from './types/config';

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
   * @param formId form ID
   * @param config vts configurations
   */
  constructor(formId: string, config?: VtsConfig);
  form: HTMLFormElement;
  fields: NodeListOf<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >;

  /**
   * Checks the validity of the form.
   * @returns {Boolean} True if the form is valid, false otherwise.
   */
  isFormValid(this: Vts): boolean;

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
}

export default Vts;
