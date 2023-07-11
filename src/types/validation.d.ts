import type ValidateThenSubmit from '../ValidateThenSubmit';
import { VtsValidationData } from './config';
import type { VtsRuleMessage, VtsRules } from './rules';

/**
 * Represents the validation functionality in Vts (Validate Then Submit).
 */
declare class VtsValidation {
  /**
   * The data object containing information about valid and invalid fields.
   */
  _data: {
    validFields: Map<string, VtsValidationData<string>>;
    invalidFields: Map<string, VtsValidationData<string>>;
  };

  /**
   * Checks the validity of a field.
   * @param field The field to check.
   */
  _checkFieldValidity(
    this: ValidateThenSubmit,
    field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  ): void;

  /**
   * Validates each field triggered by the form submit event.
   */
  _validate(this: ValidateThenSubmit): void;

  /**
   * Clears the validity state of a field.
   * @param field The field to clear the validity state for.
   */
  _clearValidity(
    field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  ): void;

  /**
   * Gets the custom validity message based on the field's validity state.
   * @param field The field to get the validity state message for.
   * @param validityStateMsg Optional custom validity state messages.
   * @returns The validity state message.
   */
  _getValidityStateMessage(
    this: ValidateThenSubmit,
    field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
    validityStateMsg?: VtsRuleMessage
  ): string;

  /**
   * Sets the validity state of a field.
   * @param valid Whether the field is valid.
   * @param field The field to set the validity state for.
   * @param data The validation data for the field.
   */
  _setValidity(
    this: ValidateThenSubmit,
    valid: boolean,
    field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
    data: VtsValidationData<string>
  ): void;

  /**
   * Reports the validity of all fields to the form.
   */
  _reportValidity(this: ValidateThenSubmit): void;
}

export { VtsValidation };
