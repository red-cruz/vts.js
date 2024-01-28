import type VtsBase from '.';
import { RuleKeys } from '../config/rules';

export default interface VtsValidationBase {
  /**
   * Validates each field.
   * @param field The field to check.
   */
  _validate(
    this: VtsBase,
    field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  ): Promise<void>;
}

type RuleKeysWithValid = RuleKeys | 'valid';

export type ValidationResults = {
  [Key in RuleKeysWithValid]?: Key extends 'validator'
    ? string | string[]
    : string;
};
