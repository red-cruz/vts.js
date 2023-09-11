// @ts-check

import {
  dialogBtnContainerId,
  dialogId,
  dialogMsgId,
  dialogTitleId,
} from '../constants';
import createAnchor from './createAnchor';
import isMsgHTMLorScript from './isMsgHTMLorScript';

/**
 * Creates a dialog with the given title and message.
 *
 * @param {string} title The title of the dialog.
 * @param {string} message The message of the dialog.
 * @returns {HTMLDialogElement} The created dialog element.
 */
export default function createDialog(title, message) {
  // Create a dialog element.
  const dialog = document.createElement('dialog');
  dialog.style.minWidth = '250px';
  dialog.id = dialogId;

  // Create the title container.
  const titleBar = document.createElement('div');
  titleBar.id = dialogTitleId;
  titleBar.textContent = title;
  titleBar.style.fontWeight = 'bold';

  // Create the OK button.
  const okButton = document.createElement('button');
  okButton.id = dialogBtnContainerId;
  okButton.style.padding = '3px 16px';
  okButton.style.float = 'right';
  okButton.textContent = 'Ok';
  okButton.onclick = function () {
    dialog.close();
  };

  // Create the message container.
  const messageSection = document.createElement('div');
  messageSection.id = dialogMsgId;
  messageSection.style.margin = '5px 0';

  // Format the message content.
  if (isMsgHTMLorScript(message)) {
    createAnchor(dialog, messageSection, title, message);
  } else {
    messageSection.innerHTML = message;
  }

  // Append the children to the dialog element.
  dialog.appendChild(titleBar);
  dialog.appendChild(messageSection);
  dialog.appendChild(okButton);
  document.body.appendChild(dialog);

  return dialog;
}
