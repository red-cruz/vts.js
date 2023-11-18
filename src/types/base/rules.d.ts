import type VtsBase from '.';
import type { VtsRules } from '../config/rules';

export default interface VtsRulesBase {
  _applyRules(
    this: VtsBase,
    rules: VtsRules[string],
    field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
    label: string
  ): Promise<string>;

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
