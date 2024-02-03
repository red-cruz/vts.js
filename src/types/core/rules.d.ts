import type VtsCore from '.';
import type { Rules } from '../config/rules';

export default interface VtsRulesCore {
  _getFieldRules(
    this: VtsCore,
    field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  ): Rules[string];

  _convertRulesToMap(this: VtsCore): void;

  _setCheckingRule(
    this: VtsCore,
    rules: Rules[string],
    field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
    label: string
  ): void;
}
