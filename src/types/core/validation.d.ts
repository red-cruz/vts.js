import type VtsCore from '.';
import { RuleKeys, Rules } from '../config/rules';

export default interface VtsValidationCore {
  /**
   * Validates each field.
   * @param field The field to check.
   */
  _validate(
    this: VtsCore,
    field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  ): Promise<void>;
}

export type ValidationResults = {
  [Key in RuleKeys | 'valid']?: Key extends 'validator'
    ? string | string[]
    : string;
};
