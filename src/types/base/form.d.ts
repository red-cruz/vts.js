import type Vts from '../../Vts';

export default interface VtsForm {
  /**
   * Checks the validity of the form.
   * @returns {Boolean} True if the form is valid, false otherwise.
   */
  isFormValid(this: Vts): boolean;

  /**
   * @description Submits the form via fetch API.
   * @returns {Promise} A promise that resolves on success or rejects on failure.
   * @async
   */
  submit(
    this: Vts
  ): Promise<{ data: any; response: Response; form: HTMLFormElement }>;
}
