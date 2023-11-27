import type VtsBase from '.';
import type { VtsValidationData } from '../config/handlers';
import { VtsRuleKeys } from '../config/rules';

export default interface VtsValidationBase {
  /**
   * The data object containing information about valid and invalid fields.
   */
  _data: {
    validFields: Map<string, VtsValidationData<string>[string]>;
    invalidFields: Map<string, VtsValidationData<string>[string]>;
  };

  /**
   * Validates each field triggered by the form submit event.
   * @param field The field to check.
   */
  _validate(
    this: VtsBase,
    field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  ): Promise<void>;

  /**
   * Reports the validity of all fields to the form.
   */
  _reportValidity(this: VtsBase): void;
}

type VtsValidationMessages = {
  after?: string;
  afterOrEqual?: string;
  before?: string;
  beforeOrEqual?: string;
  checking?: string;
  inArray?: string;
  equalTo?: string;
  eventType?: string;
  message?: string;
  notInArray?: string;
  pattern?: string;
  required?: string;
  requiredIf?: string;
  size?: string;
  valid?: string;
  validator?: string | string[];
};
