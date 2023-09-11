// @ts-check
import { vtsResponseMessages } from './constants';
import getDefaultMsgFromResponse from './response/getDefaultMsgFromResponse';
import isMsgHTMLorScript from './response/isMsgHTMLorScript';

/**
 * Extracts title and message from response and formats it
 *
 * Note: This function can also get title and message from errors that occurred on the client side,
 * such as when the fetch request is aborted or an error was thrown in the `before` and `success` ajax callbacks.
 *
 * @param {*} data The parsed data from the server.
 * @param {Response|null} response The response from the server.
 * @param {import('../types/config/responseMessage').default} [customMessages=vtsResponseMessages]
 * @returns {{title:string, message: string}} An object with the title and message of the error.
 */
export default function getResponseMessage(
  data,
  response,
  customMessages = vtsResponseMessages
) {
  let title = '';
  let message = '';

  // Check if data is from server - response is null if an error occured from client i.e 'AbortError'
  if (response) {
    // Set default messages based on response
    [title, message] = getDefaultMsgFromResponse(response, customMessages);

    // If data is HTML or script, set message to data
    if (isMsgHTMLorScript(data)) {
      message = data;
    } else {
      // If data is an object, format message based on the title and message properties returned from the data
      if (typeof data === 'object') {
        title = data.title ?? title;
        message = data.message ?? message;

        // If message is an object, update the message and iterate and extract each values
        if (typeof data.message === 'object') {
          message = '';
          for (const err in data.message) {
            message += `<span style="display:block">${data.message[err]}</span>`;
          }
        }
      }
      // else, use defaults
    }
  } else {
    // error occured from client
    if (typeof data === 'object') {
      title = data.name;
      message = data.message;
    } else {
      title = 'An unknown error has occurred';
      message = data;
    }
  }

  return { title, message };
}
