import type VtsResponseMessage from 'types/config/responseMessage';

/**
 * Gets the default title and message for a response
 */
export default function getDefaultMsgFromResponse(
  response: Response,
  defaultMessages: VtsResponseMessage,
): string[] {
  let title: string;
  let message: string;

  // Get the default message for the status code
  const msg = defaultMessages[response.status];

  // If a default message exists, use it
  if (msg) {
    ({ title, message } = msg);
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
