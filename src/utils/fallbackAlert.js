// @ts-check

import isMsgHTMLorScript from './isMsgHTMLorScript';
import openNewWindow from './openNewWindow';

/**
 * @param {string} title
 * @param {string} message
 */
export default function fallBackAlert(title, message) {
  // add line breaks for better readability
  message = `\n\n${message}`;

  // prevent the script or html from being displayed in the alert message
  if (isMsgHTMLorScript(message)) message = '';

  const confirmed = confirm(`\n${title}.${message}`);
  if (confirmed) openNewWindow(message);
}
