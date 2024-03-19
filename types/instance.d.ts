import { RuleKey } from './config/rules';
import type Vts from '.';
import type VtsConfig from './config';

export type ValidationResults = {
  [Key in RuleKey | 'valid']?: Key extends 'validator' ? string | string[] : string;
};

export interface HasEvents {
  addFieldListener(this: Vts): void;
  addEventListeners(this: Vts): void;
}

export interface Validateable {
  /**
   * Checks the validity of the form.
   * @returns True if the form is valid, false otherwise.
   */
  isFormValid(this: Vts, validate: boolean): Promise<boolean>;

  /**
   * @description Submits the form via fetch API.
   * @returns {Promise} A promise that resolves on success or rejects on failure.
   * @async
   */
  submit(this: Vts): Promise<{ data: any; response: Response | null; form: HTMLFormElement }>;
}

export class VtsCore {
  private init(form: HTMLFormElement, config: VtsConfig): void;
}
