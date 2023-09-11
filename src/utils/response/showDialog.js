// @ts-check
import { dialogId, dialogMsgId, dialogTitleId } from '../constants';
import createAnchor from './createAnchor';
import createDialog from './createDialog';
import fallBackAlert from './fallbackAlert';
import isMsgHTMLorScript from './isMsgHTMLorScript';

/**
 * @param {string} title
 * @param {string} message
 */
export default function showDialog(title, message) {
  let existingDialog = document.getElementById(dialogId);
  if (existingDialog instanceof HTMLDialogElement) {
    const messageSection = existingDialog.querySelector(`#${dialogMsgId}`);
    if (messageSection instanceof HTMLDivElement) {
      const titleBar = existingDialog.querySelector(`#${dialogTitleId}`);
      if (titleBar) titleBar.textContent = title;
      if (isMsgHTMLorScript(message)) {
        createAnchor(existingDialog, messageSection, message);
        console.log('existing dialog with html body');
      } else {
        messageSection.textContent = message;
        console.log('existing dialog with new data', title, message);
      }
    }
    console.log('show existing modal');
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
