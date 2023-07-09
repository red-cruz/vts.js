// @ts-check

import type ValidateThenSubmit from '../ValidateThenSubmit';
import type { VtsValidationData } from './config';

declare class VtsRulesMixin {
  _applyRules(
    this: ValidateThenSubmit,
    rules: VtsRules<string>[string] & {
      pattern: string;
      flags: string;
      message: VtsRuleMessage;
    },
    fieldValue: string,
    fieldData: VtsValidationData<string>[string]
  ): [boolean, VtsValidationData<string>[string]];

  _applyMatch(
    this: ValidateThenSubmit,
    rules: VtsRules<string>[string] & {
      match: string;
      flags: string;
      message: VtsRuleMessage;
    },
    fieldValue: string,
    fieldData: VtsValidationData<string>[string]
  ): [boolean, VtsValidationData<string>[string]];

  _getFieldRules(
    this: ValidateThenSubmit,
    fieldName: string
  ): VtsRules<string>[string] | undefined;

  _convertRulesToMap(this: ValidateThenSubmit): void;
}

/**
 * Represents the validation rules for a set of fields in Vts (Validate Then Submit).
 */
type VtsRules<TFieldNames extends string> = {
  [K in TFieldNames]:
    | {
        /**
         * The pattern that will be used to create a RegExp object for validation.
         */
        pattern: string;
        /**
         * The flags that will be used when creating the RegExp object.
         */
        flags: string;
        /**
         * The message configuration for the validation rule.
         */
        message: VtsRuleMessage;
      }
    | {
        /**
         * The name of the field to match the value against.
         */
        match: string;
        /**
         * The flags that will be used when creating the RegExp object for matching.
         */
        flags: string;
        /**
         * The message configuration for the validation rule.
         */
        message: VtsRuleMessage;
      };
};

type ValidityStateFlags =
  | 'valueMissing'
  | 'typeMismatch'
  | 'patternMismatch'
  | 'tooLong'
  | 'tooShort'
  | 'rangeUnderflow'
  | 'rangeOverflow'
  | 'stepMismatch'
  | 'badInput';

/**
 * Represents the configuration for the validation rule messages in Vts (Validate Then Submit).
 */
type VtsRuleMessage = {
  /**
   * The message to display when the field is valid.
   */
  valid?: string;
  /**
   * The message to display when the field is invalid.
   * This message is also used as the custom validation message.
   */
  invalid: string;

  validityState?: {
    [K in ValidityStateFlags]?: string;
  };
};

export { VtsRulesMixin, VtsRules, VtsRuleMessage };
