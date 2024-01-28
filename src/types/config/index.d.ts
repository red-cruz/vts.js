import { ValidationResults } from '../base/validation';
import type AjaxSettings from './ajaxSettings';
import type { ValidationMessages, Rules } from './rules';

/**
 * Represents the configuration options for Vts (Validate Then Submit).
 */
export default interface VtsConfig {
  /**
   * The Ajax settings for form submission.
   */
  ajax: AjaxSettings;

  /**
   * Renders feedback to the user based on the validation result.
   *
   * @param {ValidationResults} validationResults  - Feedback messages.
   * @param {Object} renderClass - An object containing classes for the invalid and valid feedback.
   */
  renderFeedback: (
    this: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
    validationResults: ValidationResults,
    renderClass: {
      form: string;
      invalid: string;
      valid: string;
      wrapper?: string;
    }
  ) => void;

  /**
   * Determines whether to halt the form submission if there are invalid fields.
   * @default false
   */
  halt: boolean;

  /**
   * Determines whether to add event listeners immediately on Vts instantiation.
   * @default false
   */
  listen: boolean;

  /**
   * The validation rules for the form fields.
   * @default {}
   * @example
   *  rules: {
   *    password_confirmation: {
   *      equalTo: 'password',
   *      message: {
   *        equalTo: '{:label} must match the value of {:targetLabel}'
   *      }
   *    }
   * }
   */
  rules: Rules;

  /**
   * The custom validation message configuration.
   * @default
   * {
   *  invalid: 'Invalid {:label}',
   *  valid: '',
   * }
   */
  message: ValidationMessages;

  /**
   * Determines whether to stop event propagation on form submission.
   * @default true
   */
  stopPropagation: boolean;

  /**
   * The CSS classes to be applied.
   */
  class: {
    /**
     * The CSS class to apply to the form when it has been validated.
     * @default 'was-validated'
     */
    form: string;

    /**
     * The CSS class to apply to the feedback container when the field is invalid.
     *
     * @default 'invalid-feedback'
     */
    invalid: string;

    /**
     * The CSS class to apply to the feedback container when the field is valid.
     *
     * @default 'valid-feedback'
     */
    valid: string;

    /**
     * The CSS class to apply to the field wrapper.
     * Also used as a reference to the parent where the feedback will be appended
     *
     * @default undefined - the fields parentNode
     */
    wrapper?: string;
  };
}
