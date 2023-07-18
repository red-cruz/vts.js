import type Vts from '../vts';
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
    validFields: Map<string, VtsValidationData<string>[string]>;
    invalidFields: Map<string, VtsValidationData<string>[string]>;
  };

  /**
   * Checks the validity of a field.
   * @param field The field to check.
   */
  _checkFieldValidity(
    this: Vts,
    field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  ): void;

  /**
   * Validates each field triggered by the form submit event.
   * @param field The field to get the validity state message for.
   * @returns The validity state message.
   */
  _validate(
    this: Vts,
    field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
    label: string
  ): string;

  /**
   * Sets the validity state of a field.
   * @param valid Whether the field is valid.
   * @param field The field to set the validity state for.
   * @param data The validation data for the field.
   */
  _setValidityData(
    this: Vts,
    field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
    data: VtsValidationData<string>[string]
  ): void;

  /**
   * Reports the validity of all fields to the form.
   */
  _reportValidity(this: Vts): void;
}

export { VtsValidation, VtsValidationData };
