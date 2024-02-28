import type VtsCore from '.';
import { VtsField } from '.';
import { RuleKey, Rules } from '../config/rules';

export default interface VtsValidationCore {
  /**
   * Validates each field.
   * @param field The field to check.
   */
  _validate(this: VtsCore, field: VtsField): Promise<void>;
}

export type ValidationResults = {
  [Key in RuleKey | 'valid']?: Key extends 'validator'
    ? string | string[]
    : string;
};
