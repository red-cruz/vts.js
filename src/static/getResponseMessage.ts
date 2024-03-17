import type VtsResponseMessage from 'types/config/responseMessage';
import getDefaultMsgFromResponse from '../utils/response/getDefaultMsgFromResponse';
import isMsgHTMLorScript from '../utils/response/isMsgHTMLorScript';
import { vtsResponseMessages } from '../utils/constants';

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
export default function getResponseMessage(
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
      message = extractMessage(data.message ?? message);
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

/**
 * If message is an object, update the message and iterate and extract each values
 *
 * @param {*} data
 * @returns {string}
 */
function extractMessage(data) {
  let msg = '';
  if (typeof data === 'object') {
    for (const index in data) {
      msg += extractMessage(data[index]);
    }
  } else {
    msg = data + '<br />';
  }
  return msg;
}
