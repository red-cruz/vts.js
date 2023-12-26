import type VtsBase from '.';
import type { VtsRules } from '../config/rules';

export default interface VtsRulesBase {
  _getFieldRules(
    this: VtsBase,
    field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  ): VtsRules[string] | undefined;

  _convertRulesToMap(this: VtsBase): void;

  _setCheckingRule(
    this: VtsBase,
    rules: VtsRules[string],
    field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
    label: string
  );
}
