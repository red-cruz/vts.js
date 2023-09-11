// @ts-check

/**
 * Gets the default title and message for a response
 *
 * @param {Response} response
 * @param {import('../../types/config/responseMessage').default} defaultMessages
 * @returns {[title:string, message:string]}
 */
export default function getDefaultMsgFromResponse(response, defaultMessages) {
  let title = '';
  let message = '';

  // Get the default message for the status code
  const statusMsg = defaultMessages[response.status];

  // If a default message exists, use it
  if (statusMsg) {
    title = statusMsg.title;
    message = statusMsg.message;
  } else {
    // Otherwise, create default messages based on the response status
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
