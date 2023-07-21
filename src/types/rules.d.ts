// @ts-check

import type Vts from '../vts';
import type { VtsValidationData } from './config';

declare abstract class VtsRulesMixin {
  _applyRules(
    this: Vts,
    rules: VtsRules[string],
    field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
    label: string
  ): string;

  _getFieldRules(this: Vts, fieldName: string): VtsRules[string] | undefined;

  _convertRulesToMap(this: Vts): void;
}

/**
 * Represents the validation rules for a set of fields in Vts (Validate Then Submit).
 */
type VtsRules = {
  [key: string]:
    | {
        /**
         * the type of event that will be applied to the field
         */
        eventType?: string;
        /**
         * The flags that will be used when creating the RegExp object.
         */
        flags?: string;
        /**
         * The pattern that will be used to create a RegExp object for validation.
         */
        pattern: string | RegExp;
        /**
         * The message configuration for the validation rule.
         */
        message?: Partial<VtsRuleMessage>;
        requires?: string;
      }
    | {
        /**
         * the type of event that will be applied to the field \
         */
        eventType?: string;
        /**
         * The flags that will be used when creating the RegExp object for matching.
         */
        flags?: string;
        /**
         * The name of the field to match the value against.
         */
        match: Extract<keyof VtsRules, string>;
        /**
         * The message configuration for the validation rule.
         */
        message?: Partial<VtsRuleMessage>;
        requires?: string;
      };
};

type VtsValidityState =
  | 'badInput'
  | 'customError' // customvalidity that has been set outside of Vts
  | 'invalid' // error message for Vts
  | 'patternMismatch'
  | 'rangeOverflow'
  | 'rangeUnderflow'
  | 'stepMismatch'
  | 'tooLong'
  | 'tooShort'
  | 'typeMismatch'
  | 'valueMissing'
  | 'valid';

/**
 * Represents the configuration for the validation rule messages in Vts (Validate Then Submit).
 */
type VtsRuleMessage = {
  [Key in VtsValidityState]: string;
};

export { VtsRulesMixin, VtsRules, VtsRuleMessage };
