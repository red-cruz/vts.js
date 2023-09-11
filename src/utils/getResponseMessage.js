// @ts-check
import isMsgHTMLorScript from './isMsgHTMLorScript';
import vtsResponseMessages from './messages';

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
    }
  } else {
    // error occured from client
  }
  //

  return { title, message };

  // Check if data is an object
  if (typeof data === 'object') {
    if (response) {
      // data is from server
      title = data.title || title;
      message = data.message || '';

      // for validation errors from server
      const validationErrors = data.validation_errors;
      if (typeof validationErrors === 'object') {
        // Construct error message for display
        message = '';
        for (const err in validationErrors) {
          message += `${validationErrors[err]}<br/>`;
        }
      }
    } else {
      // data is an Error/Exception
      title = data.name || title;
      message = data.stack || data.message || message;
    }
  }

  return { title, message };
}

/**
 * @param {Response} response
 * @param {import("c:/wamp64/www/Projects/vts.js/src/types/config/responseMessage").default} customMessages
 * @returns {[title:string, message:string]}
 */
function getDefaultMsgFromResponse(response, customMessages) {
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
    title = response.statusText;
    message = 'Please try again later.';
  }

  console.log('from response:', { title, message });
  return [title, message];
}

/* 
// Handle error response
  let title = response
    ? `${response.statusText}:  ${response.status}`
    : 'Error';
  let message = data;

  // Check if data is an object
  if (typeof data === 'object') {
    if (response) {
      // data is from server
      title = data.title || title;
      message = data.message || '';

      // for validation errors from server
      const validationErrors = data.validation_errors;
      if (typeof validationErrors === 'object') {
        // Construct error message for display
        message = '';
        for (const err in validationErrors) {
          message += `${validationErrors[err]}<br/>`;
        }
      }
    } else {
      // data is an Error/Exception
      title = data.name || title;
      message = data.stack || data.message || message;
    }
  }

*/
