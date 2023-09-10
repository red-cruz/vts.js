/**
 * Represents the Ajax settings for form submission in Vts (Validate Then Submit).
 */
interface VtsAjaxSettings {
  abortController?: AbortController;

  /**
   * The URL action for the form submission.
   *
   * **default**: The value of the form's `action` attribute
   */
  action: string;

  /**
   * The request options for the Ajax call.
   * @default {}
   */
  request: RequestInit;

  /**
   * Called before the Ajax request is sent.
   *
   * @param requestInit The ajax.request object
   * @param abortController The `AbortController` associated with the request.
   * @param form The HTML form element being submitted.
   *
   * **IMPORTANT:** If `requestInit` is modified, you need to `return requestInit` for the modifications to take effect.
   */
  beforeSend: (
    requestInit: RequestInit,
    abortController: AbortController,
    form: HTMLFormElement
  ) => void | RequestInit;

  /**
   * Called when the Ajax request is complete.
   *
   * @param form The HTML form element that was submitted.
   */
  complete: (form: HTMLFormElement) => void;

  /**
   * Called when an error occurs during the Ajax request.
   *
   * @param error The error data received from the server response or a thrown error message.
   * @param response The Response object representing the error response, if applicable. Can be null if the error did not come from the server.
   * @param form The HTML form element that was submitted.
   */
  error: (
    errorData: any,
    response: Response | null,
    form: HTMLFormElement
  ) => void | Promise<any>;

  /**
   * Called when the Ajax request is successful.
   *
   * @param data The response data received from the server, parsed into a JavaScript object from JSON input or parsed into a text. Can be null if the content type is neither 'application/json', 'text/html', nor 'text/plain'.
   * @param response The Response object representing the successful response.
   * @param form The HTML form element that was submitted.
   */
  success: (
    data: any,
    response: Response,
    form: HTMLFormElement
  ) => void | Promise<any>;
}
