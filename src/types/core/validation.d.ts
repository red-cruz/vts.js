import type VtsCore from '.';
import { VtsField } from '.';
import { RuleKeys, Rules } from '../config/rules';

export default interface VtsValidationCore {
  /**
   * Validates each field.
   * @param field The field to check.
   */
  _validate(this: VtsCore, field: VtsField): Promise<void>;
}

export type ValidationResults = {
  [Key in RuleKeys | 'valid']?: Key extends 'validator'
    ? string | string[]
    : string;
};
