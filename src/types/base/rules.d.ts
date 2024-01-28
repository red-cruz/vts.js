import type VtsBase from '.';
import type { Rules } from '../config/rules';

export default interface VtsRulesBase {
  _getFieldRules(
    this: VtsBase,
    field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  ): Rules[string];

  _convertRulesToMap(this: VtsBase): void;

  _setCheckingRule(
    this: VtsBase,
    rules: Rules[string],
    field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
    label: string
  ): void;
}
