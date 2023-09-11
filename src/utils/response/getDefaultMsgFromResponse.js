// @ts-check

import { vtsResponseMessages } from '../constants';

/**
 * @param {Response} response
 * @param {import("c:/wamp64/www/Projects/vts.js/src/types/config/responseMessage").default} defaultMessages
 * @returns {[title:string, message:string]}
 */
export default function getDefaultMsgFromResponse(response, defaultMessages) {
  let title = '';
  let message = '';
  // get assigned default message for the status code
  const statusMsg = defaultMessages[response.status];

  // assign new default values based on response
  if (statusMsg) {
    // assign default values from defaultMessagees
    title = statusMsg.title;
    message = statusMsg.message;
  } else {
    // create and assign new default values based on response status
    if (response.ok) {
      title = 'Success!';
      message = 'The request was successful.';
    } else {
      title = response.statusText + ': ' + response.status;
      message = 'Please try again later.';
    }
  }

  return [title, message];
}
