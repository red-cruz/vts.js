import type VtsResponseMessage from 'types/config/responseMessage';
import getDefaultMsgFromResponse from 'src/utils/response/getDefaultMsgFromResponse';
import isMsgHTMLorScript from 'src/utils/response/isMsgHTMLorScript';
import vtsResponseMessages from 'constants/responseMessages';

export default abstract class AjaxStatic {
  /**
   * Extracts title and message from response and formats it
   *
   * Note: This function can also get title and message from errors that occurred on the client side,
   * such as when the fetch request is aborted or an error was thrown in the `before` and `success` ajax callbacks.
   *
   * @param  data The parsed data from the server.
   * @param response The response from the server.
   * @param defaultResponseMessages Default msg
   * @returns An object with the title and message of the error.
   */
  static getResponseMessage(
    data: any,
    response: Response | null,
    defaultResponseMessages: VtsResponseMessage = vtsResponseMessages,
  ) {
    let title = '';
    let message = '';

    // Check if data is from server - response is null if an error occured from client i.e 'AbortError'
    if (response) {
      // Set default messages based on response
      [title, message] = getDefaultMsgFromResponse(response, defaultResponseMessages);

      // If data is HTML or script, set message to data
      if (isMsgHTMLorScript(data)) {
        message = data;
      } else {
        // get message based on the title and message properties returned from the data
        title = data.title ?? title;

        const errResponse = data.message ?? message;
        const msg = typeof errResponse === 'string' ? [errResponse] : Object.values(errResponse);

        message = msg.flatMap((item) => item).join('<br/>');
      }
    } else {
      // error occured from client
      if (typeof data === 'object') {
        title = data.name;
        ({ message } = data);
      } else {
        title = 'An unknown error has occurred';
        message = data;
      }
    }

    return { title, message };
  }
}
