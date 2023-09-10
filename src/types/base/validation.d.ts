import type VtsBase from '.';
import type { VtsValidationData } from '../config/handlers';

export default interface VtsValidationBase {
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
    this: VtsBase,
    field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  ): void;

  /**
   * Validates each field triggered by the form submit event.
   * @param field The field to get the validity state message for.
   * @returns The validity state message.
   */
  _validate(
    this: VtsBase,
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
    this: VtsBase,
    field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
    data: VtsValidationData<string>[string]
  ): void;

  /**
   * Reports the validity of all fields to the form.
   */
  _reportValidity(this: VtsBase): void;
}
