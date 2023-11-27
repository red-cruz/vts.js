import type VtsBase from '.';
import type { VtsRules } from '../config/rules';
import { VtsValidationMessages } from './validation';

export default interface VtsRulesBase {
  _getFieldRules(
    this: VtsBase,
    fieldName: string
  ): VtsRules[string] | undefined;

  _convertRulesToMap(this: VtsBase): void;

  _setCheckingRule(
    this: VtsBase,
    rules: VtsRules[string],
    field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
    label: string
  );
}
