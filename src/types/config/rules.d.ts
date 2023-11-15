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
    equalTo?: Extract<keyof VtsRules, string>;

    /**
     * The message configuration for the validation rule.
     */
    message?: VtsRuleMessage;

    /**
     * The pattern that will be used for validation.
     */
    pattern?: RegExp;

    /**
     * The name of the field that the this field requires or a Function that returns a boolean whether this field should be required
     */
    requiredIf?:
      | string
      | ((
          field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
          label: string
        ) => boolean);

    /**
     * A function that will be called to validate the input field.
     * The function should return a `string` containing the custom validity message if the input field is invalid.
     * Returning a falsey value will consider the field as `valid`
     * The custom validity message will be set internally on the input field.
     * If the function resolves the promise, the input field will be considered valid.
     * @async
     * @param field The form field to validate.
     * @returns A promise that resolves with a falsey value, or rejects with a custom validity message.
     * */
    validator: (
      field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
      label: string
    ) => Promise<string>;
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
  | 'loading'
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
