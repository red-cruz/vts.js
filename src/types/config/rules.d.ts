/**
 * Represents the validation rules for a set of fields in Vts (Validate Then Submit).
 */
type VtsRules = {
  [key: string]: {
    /**
     * the type of event that will be applied to the field
     */
    eventType?: VtsEventTypes;

    /**
     * The flags that will be used when creating the RegExp object.
     */
    flags?: string;

    /**
     * The name of the field to match the value against.
     */
    matches?: Extract<keyof VtsRules, string>;

    /**
     * The message configuration for the validation rule.
     */
    message?: VtsRuleMessage;

    /**
     * The pattern that will be used to create a RegExp object for validation.
     */
    pattern?: string | RegExp;

    /**
     * The name of the field that the this field requires
     */
    requires?: string;
  };
};

/**
 * The values in this type are the possible validity states for a form field.
 *
 * `customError` - customvalidity that has been set outside of Vts
 *
 * `invalid` - error message for Vts
 */
type VtsValidityState =
  | 'badInput'
  | 'customError'
  | 'invalid'
  | 'patternMismatch'
  | 'rangeOverflow'
  | 'rangeUnderflow'
  | 'stepMismatch'
  | 'tooLong'
  | 'tooShort'
  | 'typeMismatch'
  | 'valueMissing'
  | 'valid';

type VtsEventTypes =
  | 'input'
  | 'change'
  | 'keydown'
  | 'keyup'
  | 'submit'
  | 'mouseover'
  | 'mouseout';

/**
 * Represents the configuration for the validation rule messages in Vts (Validate Then Submit).
 */
type VtsRuleMessage = {
  [Key in VtsValidityState]?: string;
};

export { VtsRuleMessage, VtsRules };
