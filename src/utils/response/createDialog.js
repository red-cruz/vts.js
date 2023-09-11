// @ts-check

import { dialogId, dialogMsgId, dialogTitleId } from '../constants';
import createAnchor from './createAnchor';
import isMsgHTMLorScript from './isMsgHTMLorScript';

/**
 * @param {string} title
 * @param {string} message
 * @returns {HTMLDialogElement}
 */
export default function createDialog(title, message) {
  const dialog = document.createElement('dialog');
  dialog.id = dialogId;

  // create title container
  const titleBar = document.createElement('div');
  titleBar.id = dialogTitleId;
  titleBar.textContent = title;
  titleBar.style.marginBottom = '5px';

  // create ok btn
  const okButton = document.createElement('button');
  okButton.textContent = 'Ok';
  okButton.style.padding = '3px 16px';
  okButton.style.float = 'right';
  okButton.style.marginTop = '30px';
  okButton.onclick = function () {
    dialog.close();
  };

  // create msg container
  const messageSection = document.createElement('div');
  messageSection.id = dialogMsgId;

  // format text content
  if (isMsgHTMLorScript(message)) {
    createAnchor(dialog, messageSection, message);
  } else {
    messageSection.textContent = message;
  }

  // append
  dialog.appendChild(titleBar);
  dialog.appendChild(messageSection);
  dialog.appendChild(okButton);
  document.body.appendChild(dialog);

  return dialog;
}
