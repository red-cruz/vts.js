import type VtsCore from '.';

export default interface VtsFormCore {
  /**
   * Checks the validity of the form.
   * @returns {Boolean} True if the form is valid, false otherwise.
   */
  isFormValid(this: VtsCore): boolean;

  /**
   * @description Submits the form via fetch API.
   * @returns {Promise} A promise that resolves on success or rejects on failure.
   * @async
   */
  submit(
    this: VtsCore
  ): Promise<{ data: any; response: Response | null; form: HTMLFormElement }>;
}
