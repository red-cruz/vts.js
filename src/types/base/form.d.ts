import type VtsBase from '.';

export default interface VtsFormBase {
  /**
   * Checks the validity of the form.
   * @returns {Boolean} True if the form is valid, false otherwise.
   */
  isFormValid(this: VtsBase): boolean;

  /**
   * @description Submits the form via fetch API.
   * @returns {Promise} A promise that resolves on success or rejects on failure.
   * @async
   */
  submit(
    this: VtsBase
  ): Promise<{ data: any; response: Response | null; form: HTMLFormElement }>;
}
