import type VtsCore from '.';
import { VtsField } from '.';
import type { Rules } from '../config/rules';

export default interface VtsRulesCore {
  _getFieldRules(this: VtsCore, field: VtsField): Rules[string];

  _convertRulesToMap(this: VtsCore): void;

  _setFieldAttributes(this: VtsCore): void;

  _setCheckingRule(
    this: VtsCore,
    rules: Rules[string],
    field: VtsField,
    label: string
  ): void;
}
