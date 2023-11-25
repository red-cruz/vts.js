import type VtsBase from '.';
import type { VtsRules } from '../config/rules';
import { VtsValidationMessages } from './validation';

export default interface VtsRulesBase {
  _applyRules(
    this: VtsBase,
    rules: VtsRules[string] | undefined,
    field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
    label: string
  ): Promise<VtsValidationMessages>;

  _getFieldRules(
    this: VtsBase,
    fieldName: string
  ): VtsRules[string] | undefined;

  _dateRule(
    this: VtsBase,
    rule: string,
    rules: VtsRules[string],
    field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  ): {
    targetField: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    targetDate: Date;
  } | null;

  _convertRulesToMap(this: VtsBase): void;

  _setCheckingRule(
    this: VtsBase,
    rules: VtsRules[string],
    field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
    label: string
  );
}
