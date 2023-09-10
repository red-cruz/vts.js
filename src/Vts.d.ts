// @ts-check
import type { VtsConfig } from './types1/newconfig';
import type { VtsRulesMixin } from './types1/rules';
import type { VtsValidation } from './types1/validation';

/**
 * A JavaScript library that provides a simple and flexible way to handle
 * form validation before submitting. It allows you to customize the validation rules,
 * error messages, and actions to be performed when a form field is valid or invalid.
 *
 * @author RED
 */
declare class Vts {
  /**
   * Creates an instance of Vts.
   * @param {string} formId form ID
   * @param {VtsConfig} config vts configurations
   */
  constructor(formId: string, config?: Partial<VtsConfig>);
  form: HTMLFormElement;
  fields: NodeListOf<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >;

  /**
   * Sets the default configuration for Vts (Validate Then Submit).
   * @param config The configuration options.
   */
  static setDefaults(config: Partial<VtsConfig>): void;

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
  static getOrCreateInstance(formId: string, config?: Partial<VtsConfig>): Vts;

  /**
   * Removes the instance of Vts (Validate Then Submit) for the specified form ID.
   * @param formId The ID of the form.
   * @returns True if the instance was removed, false otherwise.
   */
  static removeInstance(formId: string): boolean;
}

declare class VtsEventsMixin {
  private _addEventListeners(this: Vts): void;
  _attachMatchEvents(this: Vts): void;
  _addFieldListener(this: Vts): void;
  _getEventType(fieldType: string, ruleEventType?: string): string;
}

declare class VtsForm {
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
}

// mixin
interface Vts
  extends VtsConfig,
    VtsEventsMixin,
    VtsRulesMixin,
    VtsForm,
    VtsValidation {}

// exports
export default Vts;
export type { VtsEventsMixin, VtsRulesMixin, VtsForm, VtsValidation };
export { VtsConfig } from './types1/config';
export type { VtsRuleMessage } from './types1/rules';
