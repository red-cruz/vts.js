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

export type ValidationResults = {
  [Key in RuleKeys | 'valid']?: Key extends 'validator'
    ? string | string[]
    : string;
};
