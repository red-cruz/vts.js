// @ts-check

import { vtsResponseMessages } from '../constants';

/**
 * @param {Response} response
 * @param {import("c:/wamp64/www/Projects/vts.js/src/types/config/responseMessage").default} customMessages
 * @returns {[title:string, message:string]}
 */
export default function getDefaultMsgFromResponse(response, customMessages) {
  let title = '';
  let message = '';
  console.log('custom:', customMessages);
  console.log('default:', vtsResponseMessages);
  const defaultMessages = Object.assign(vtsResponseMessages, customMessages);
  console.log('new:', defaultMessages);

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
      title = response.statusText + ' ' + response.status;
      message = 'Please try again later.';
    }
  }

  console.log('from response:', { title, message });
  return [title, message];
}
