import type { KeysOfType } from '../../utils/types';

/**
 * Represents a function used for validation rules that can return a value of type T or a Promise resolving to T.
 */
type RuleFunction<T> = (
  field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
  label: string
) => Promise<string | T> | string | T;

/**
 * Represents a rule that can be either T or a RuleFunction.
 * @param {string} T Specifies the expected return type of the RuleFunction (defaults to string if not provided).
 */
type Rule<T = string> = T | RuleFunction<T>;

/**
 * Represents the validation rules for a set of fields.
 */
type Rules = {
  [key: string]: {
    /**
     * The accepted file types. Only works with input type `file`.
     */
    accept?: Rule;

    /**
     * Field must be after the specified date.
     * A date object or date parseable string.
     */
    after?: Rule<string | Date>;

    /**
     * Field must be after or equal to the specified date.
     * A date object or date parseable string.
     */
    afterOrEqual?: Rule<string | Date>;

    /**
     * Field must be before the specified date.
     * A date object or date parseable string.
     */
    before?: Rule<string | Date>;

    /**
     * Field must be before or equal to the specified date.
     * A date object or date parseable string.
     */
    beforeOrEqual?: Rule<string | Date>;

    /**
     * Field must be different from the specified value.
     */
    differentFrom?: Rule;

    /**
     * Field's value must end with the specified string or substring.
     */
    endsWith?: Rule;

    /**
     * Field must be equal to the specified value.
     */
    equalTo?: Rule<any>;

    /**
     * The type of event that will trigger validation on the field.
     */
    eventType?: EventTypes;

    /**
     * The label used when rendering the validation message.
     *
     * @example
     *    messages: {
     *      required: '{:label} is a required field'
     *    }
     */
    label?: Rule;

    /**
     * Field's value must be found within the specified array.
     */
    inArray?: Rule<string[]>;

    /**
     * The message configuration for the validation rule.
     */
    messages?: ValidationMessages;

    /**
     * Field's value must be at least the specified maximum number.
     */
    max?: Rule<number>;

    /**
     * Field's value must be at least the specified maximum length
     */
    maxlength?: Rule<number>;

    /**
     * Field's value must be at least the specified minimum number.
     */
    min?: Rule<number>;

    /**
     * Field's value must be at least the specified minimum length
     */
    minlength?: Rule<number>;

    /**
     * Field's value must not be found within the specified array.
     */
    notInArray?: Rule<string[]>;

    /**
     * The regular expression pattern that will be used for validation.
     */
    pattern?: Rule<RegExp>;

    /**
     * Field is required.
     */
    required?: Rule<boolean>;

    /**
     * Field is required if the specified condition is met.
     */
    requiredIf?: Rule<boolean>;

    /**
     * Field's value must be of the specified size.
     */
    size?: Rule<number>;

    /**
     * Field's value must start with the specified string or substring.
     */
    startsWith?: Rule<string | number>;

    /**
     * A function that will be called to validate the input field.
     * The function should return a `string` containing the error message if the input field is invalid.
     * Returning any falsey value will mark the field as `valid`.
     *
     * @returns A promise that resolves with a falsey value, or rejects with a custom validity message.
     * */
    validator?: RuleFunction<any> | RuleFunction<any>[];

    /**
     * A CSS selector that specifies the element where the validation feedback will be appended.
     * It's used to target the element that will visually display the validation messages.
     * Defaults to the field's parent element.
     */
    wrapper?: string;
  };
};

type EventTypes =
  | 'input'
  | 'change'
  | 'keydown'
  | 'keyup'
  | 'submit'
  | 'mouseover'
  | 'mouseout';

/**
 * The values in this type are the possible validity states for a form field.
 */
type RuleKeys = KeysOfType<Rules[string]> | 'checking' | 'valid';

/**
 * Represents the configuration for the validation rule messages.
 */
type ValidationMessages = {
  [Key in RuleKeys]?: string;
};

export { ValidationMessages, Rules, EventTypes, RuleKeys };
