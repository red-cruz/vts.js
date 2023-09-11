// @ts-check
import { vtsResponseMessages } from './constants';
import getDefaultMsgFromResponse from './response/getDefaultMsgFromResponse';
import isMsgHTMLorScript from './response/isMsgHTMLorScript';

/**
 * Extracts title and message from response
 *
 * @param {*} data The parsed data from the server.
 * @param {Response|null} response The response from the server.
 * @param {import("c:/wamp64/www/Projects/vts.js/src/types/config/responseMessage").default} [customMessages=vtsResponseMessages]
 * @returns {{title:string, message: string}} An object with the title and message of the error.
 */
export default function getResponseMessage(
  data,
  response,
  customMessages = vtsResponseMessages
) {
  let title = '';
  let message = '';

  // check if data is from server - response is null if an error occured from client i.e 'AbortError'
  if (response) {
    // set default messages based on response
    [title, message] = getDefaultMsgFromResponse(response, customMessages);

    if (isMsgHTMLorScript(data)) {
      // message now contains the html or the script
      message = data;
    } else {
      if (typeof data === 'object') {
        // format message based on the title and message properties returned from the data
        title = data.title ?? title;
        message = data.message ?? message;

        // if message is an object, update the message and iterate and extract each values
        if (typeof data.message === 'object') {
          message = '';
          for (const err in data.message) {
            message += `<span style="display:block">${data.message[err]}</span>`;
          }
        }
      }
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
