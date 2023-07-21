// @ts-check
import type { VtsConfig } from './types/config';
import type { VtsRulesMixin } from './types/rules';
import type { VtsValidation } from './types/validation';

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
}

declare class VtsEventsMixin {
  private _addEventListeners(this: Vts): void;
  _attachMatchEvents(this: Vts): void;
  _attachRequireEvents(this: Vts): void;
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
   * @returns {Promise} A promise that resolves on success or rejects on failure.
   * @async
   */
  submit(this: Vts): Promise<void>;
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
export { VtsConfig } from './types/config';
export type { VtsRuleMessage } from './types/rules';
