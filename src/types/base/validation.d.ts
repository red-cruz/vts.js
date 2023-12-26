import type VtsBase from '.';
import type { VtsValidationData } from '../config/handlers';
import { VtsRuleKeys } from '../config/rules';

export default interface VtsValidationBase {
  /**
   * Validates each field triggered by the form submit event.
   * @param field The field to check.
   */
  _validate(
    this: VtsBase,
    field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  ): Promise<void>;
}

type VtsValidationMessages = {
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
  message?: string;
  notInArray?: string;
  pattern?: string;
  required?: string;
  requiredIf?: string;
  startsWith?: string;
  size?: string;
  valid?: string;
  validator?: string | string[];
};
