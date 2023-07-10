// @ts-check

import type ValidateThenSubmit from '../ValidateThenSubmit';
import type { VtsValidationData } from './config';

declare abstract class VtsRulesMixin {
  _applyRules(
    this: ValidateThenSubmit,
    rules: VtsRules[string] & {
      pattern: string;
      flags: string;
      message: VtsRuleMessage;
    },
    fieldValue: string,
    fieldData: VtsValidationData<string>[string]
  ): [boolean, VtsValidationData<string>[string]];

  _getFieldRules(
    this: ValidateThenSubmit,
    fieldName: string
  ): VtsRules[string] | undefined;

  _convertRulesToMap(this: ValidateThenSubmit): void;
}

/**
 * Represents the validation rules for a set of fields in Vts (Validate Then Submit).
 */
type VtsRules = {
  [key: string]:
    | {
        /**
         * The pattern that will be used to create a RegExp object for validation.
         */
        pattern: string | RegExp;
        /**
         * The flags that will be used when creating the RegExp object.
         */
        flags?: string;
        /**
         * The message configuration for the validation rule.
         */
        message: VtsRuleMessage;
      }
    | {
        /**
         * The name of the field to match the value against.
         */
        match: Extract<keyof VtsRules, string>;
        /**
         * The flags that will be used when creating the RegExp object for matching.
         */
        flags?: string;
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

  validityState?: VtsValidityStateMessage;
};

type VtsValidityStateMessage = {
  [K in ValidityStateFlags]?: string;
};

export { VtsRulesMixin, VtsRules, VtsRuleMessage, VtsValidityStateMessage };
