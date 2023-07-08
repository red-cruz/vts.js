import type { VtsConfig } from './types/config';

interface VtsEventsMixin {
  _addEventListeners(): void;
  _attachMatchEvents(): void;
  _getEventType(fieldType: string, ruleEventType?: string): string;
}

declare module 'ValidateThenSubmit' {
  interface ValidateThenSubmit extends VtsEventsMixin {}
}

/**
 * A JavaScript library that provides a simple and flexible way to handle
 * form validation before submitting. It allows you to customize the validation rules,
 * error messages, and actions to be performed when a form field is valid or invalid.
 *
 * @author RED
 */
declare class ValidateThenSubmit {
  /**
   * Creates an instance of ValidateThenSubmit.
   * new Vts('myForm', {})
   */
  constructor(formId: string, config?: VtsConfig);
  static setDefaults(config: VtsConfig): void;
}

export default ValidateThenSubmit;
export { VtsConfig, setVtsDefaults } from './types/config';
export type { VtsRuleMessage } from './types/rules';
