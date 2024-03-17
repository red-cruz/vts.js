// @ts-check
import { dialogId, dialogMsgId, dialogTitleId } from '../constants';
import createAnchor from './createAnchor';
import createDialog from './createDialog';
import fallBackAlert from './fallbackAlert';
import isMsgHTMLorScript from './isMsgHTMLorScript';

/**
 * Shows a dialog with the given title and message.
 * If a dialog with the given ID already exists, the title and message will be updated.
 * Otherwise, a new dialog will be created.
 *
 * @param {string} title The title of the dialog.
 * @param {string} message message The message of the dialog. If a string is passed, it will be displayed as plain text. If an HTMLElement is passed, it will be displayed as HTML.
 */
export default function showDialog(title, message) {
  let existingDialog = document.getElementById(dialogId);

  // Check if the dialog already exists
  if (existingDialog instanceof HTMLDialogElement) {
    // Update the title and message of the existing dialog
    const messageSection = existingDialog.querySelector(`#${dialogMsgId}`);
    if (messageSection instanceof HTMLDivElement) {
      const titleBar = existingDialog.querySelector(`#${dialogTitleId}`);
      if (titleBar) titleBar.textContent = title;
      if (isMsgHTMLorScript(message)) {
        createAnchor(existingDialog, messageSection, title, message);
      } else {
        messageSection.innerHTML = message;
      }
    }

    // Show the existing dialog
    existingDialog.showModal();
  } else {
    if (existingDialog) {
      // the dialogId is probably used by another element
      fallBackAlert(title, message);
    } else {
      // create new dialog
      const dialog = createDialog(title, message);
      dialog.showModal();
    }
  }
}
