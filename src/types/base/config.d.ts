import type VtsAjaxSettings from '../config/ajaxSettings';
import VtsHandlers from '../config/handlers';
import { VtsRuleMessage, VtsRules } from '../config/rules';
import { VtsValidationMessages } from './validation';

/**
 * Represents the configuration options for Vts (Validate Then Submit).
 */
export default interface VtsBaseConfig {
  /**
   * The Ajax settings for form submission.
   */
  ajax: VtsAjaxSettings;

  /**
   * Handle field feedback.
   */
  renderFeedback: (
    this: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
    message: VtsValidationMessages,
    fieldClass: string
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
   *        invalid: 'This input must match the value of ${targetLabel}'
   *      }
   *    }
   * }
   */
  rules: VtsRules;

  /**
   * The custom validation message configuration.
   * @default
   * {
   *  invalid: 'Invalid :{label}',
   *  valid: '',
   * }
   */
  message: VtsRuleMessage;

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
     * @default 'vts-wrapper'
     */
    wrapper: string;
  };
}
