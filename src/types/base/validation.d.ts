import type VtsBase from '.';

export default interface VtsValidationBase {
  /**
   * Validates each field.
   * @param field The field to check.
   */
  _validate(
    this: VtsBase,
    field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  ): Promise<void>;
}

type VtsValidationResults = {
  after?: string;
  afterOrEqual?: string;
  before?: string;
  beforeOrEqual?: string;
  checking?: string;
  differentFrom?: string;
  inArray?: string;
  endsWith?: string;
  equalTo?: string;
  eventType?: string;
  max?: string;
  message?: string;
  min?: string;
  notInArray?: string;
  pattern?: string;
  required?: string;
  requiredIf?: string;
  startsWith?: string;
  size?: string;
  valid?: string;
  validator?: string | string[];
  wrapper?: string;
};
