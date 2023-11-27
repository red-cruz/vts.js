/**
 * Represents the validation rules for a set of fields in Vts (Validate Then Submit).
 */
type VtsRules = {
  [key: string]: {
    /**
     * The name of the field to match the date against.
     */
    after?:
      | string
      | ((
          field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
          label: string
        ) => Promise<Date> | Date);

    /**
     * The name of the field to match the date against.
     */
    afterOrEqual?:
      | string
      | ((
          field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
          label: string
        ) => Promise<Date> | Date);

    /**
     * The name of the field to match the date against.
     */
    before?:
      | string
      | ((
          field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
          label: string
        ) => Promise<Date> | Date);

    /**
     * The name of the field to match the date against.
     */
    beforeOrEqual?:
      | string
      | ((
          field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
          label: string
        ) => Promise<Date> | Date);

    differentFrom?: string;
    endsWith?: string | number;
    /**
     * The name of the field to match the value against.
     */
    equalTo?: string;

    /**
     * the type of event that will be applied to the field
     */
    eventType?: VtsEventTypes;

    label?: string;

    inArray?:
      | Array<string>
      | ((
          field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
          label: string,
          form: HTMLFormElement
        ) => Promise<Array<string>> | Array<string>);
    /**
     * The message configuration for the validation rule.
     */
    message?: VtsRuleMessage;

    notInArray?:
      | Array<string>
      | ((
          field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
          label: string,
          form: HTMLFormElement
        ) => Promise<Array<string>> | Array<string>);
    /**
     * The pattern that will be used for validation.
     */
    pattern?: RegExp;

    /*
     */
    required?: boolean;

    /**
     * The name of the field that the this field requires or a Function that returns a boolean whether this field should be required
     */
    requiredIf?:
      | string
      | ((
          field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
          label: string,
          form: HTMLFormElement
        ) => Promise<boolean> | boolean);
    size?: number;
    startsWith?: string | number;
    /**
     * A function that will be called to validate the input field.
     * The function should return a `string` containing the error message if the input field is invalid.
     * Returning any falsey value will mark the field as `valid`.
     *
     * @async
     * @param field The form field to validate.
     * @returns A promise that resolves with a falsey value, or rejects with a custom validity message.
     * */
    validator?:
      | ((
          field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
          label: string,
          form: HTMLFormElement
        ) => any)
      | Array<
          (
            field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
            label: string,
            form: HTMLFormElement
          ) => any
        >;
  };
};

/**
 * The values in this type are the possible validity states for a form field.
 */
type VtsRuleKeys =
  | 'after'
  | 'afterOrEqual'
  | 'before'
  | 'beforeOrEqual'
  | 'between'
  | 'checking'
  | 'differentFrom'
  | 'endsWith'
  | 'equalTo'
  | 'inArray'
  | 'lowercase'
  | 'max'
  | 'min'
  | 'notInArray'
  | 'startsWith'
  | 'size'
  | 'uppercase'
  | 'validator'
  | 'required'
  | 'requiredIf'
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
  [Key in VtsRuleKeys]?: string;
};

export { VtsRuleMessage, VtsRules, VtsEventTypes, VtsRuleKeys };
