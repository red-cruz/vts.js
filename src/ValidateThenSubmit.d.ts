import type { VtsConfig } from './types/config';

/**
 * A JavaScript library that provides a simple and flexible way to handle
 * form validation before submitting. It allows you to customize the validation rules,
 * error messages, and actions to be performed when a form field is valid or invalid.
 *
 * @author RED
 */
declare class ValidateThenSubmit {
  constructor(formId: string, config: VtsConfig);
}
export default ValidateThenSubmit;
export { VtsConfig, setVtsDefaults } from './types/config';
export type { VtsRuleMessage } from './types/rules';
