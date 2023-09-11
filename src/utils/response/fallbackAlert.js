// @ts-check

import isMsgHTMLorScript from './isMsgHTMLorScript';
import openNewWindow from './openNewWindow';

/**
 * shows a fallback alert dialog with the given title and message.
 *
 * @param {string} title The title of the alert dialog.
 * @param {string} message The message of the alert dialog.
 */
export default function fallBackAlert(title, message) {
  if (isMsgHTMLorScript(message)) {
    confirm(`${title}.\n\nClick 'OK' to view more details.`) &&
      openNewWindow(title, message);
  } else {
    alert(`${title}.\n\n${message}`);
  }
}
