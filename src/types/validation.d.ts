import type ValidateThenSubmit from '../ValidateThenSubmit';
import { VtsValidationData } from './config';
import type { VtsRuleMessage, VtsRules } from './rules';

declare class VtsValidation {
  _data: {
    validFields: Map<string, VtsValidationData<string>>;
    invalidFields: Map<string, VtsValidationData<string>>;
  };
  /**
   * check
   */
  _checkFieldValidity(
    this: ValidateThenSubmit,
    field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  ): void;
  /**
   * @description Validates each field. triggered by form submit event
   */
  _validate(this: ValidateThenSubmit): void;
  _clearValidity(
    field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  ): void;
  _getValidityStateMessage(
    this: ValidateThenSubmit,
    field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
    validityStateMsg?: VtsRuleMessage
  ): string;
  _setValidity(
    this: ValidateThenSubmit,
    valid: boolean,
    field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
    data: VtsValidationData<string>
  ): void;
  _reportValidity(this: ValidateThenSubmit): void;
}
export { VtsValidation };
