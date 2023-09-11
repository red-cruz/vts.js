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
 * @param {string} title
 * @param {string} message
 * @returns {HTMLDialogElement}
 */
export default function createDialog(title, message) {
  const dialog = document.createElement('dialog');
  dialog.style.minWidth = '250px';
  dialog.id = dialogId;

  // create title container
  const titleBar = document.createElement('div');
  titleBar.id = dialogTitleId;
  titleBar.textContent = title;
  titleBar.style.fontWeight = 'bold';

  // create ok btn
  const okButton = document.createElement('button');
  okButton.id = dialogBtnContainerId;
  okButton.style.padding = '3px 16px';
  okButton.style.float = 'right';
  okButton.textContent = 'Ok';
  okButton.onclick = function () {
    dialog.close();
  };

  // create msg container
  const messageSection = document.createElement('div');
  messageSection.id = dialogMsgId;
  messageSection.style.margin = '5px 0';

  // format text content
  if (isMsgHTMLorScript(message)) {
    createAnchor(dialog, messageSection, message);
  } else {
    messageSection.innerHTML = message;
  }

  // append
  dialog.appendChild(titleBar);
  dialog.appendChild(messageSection);
  dialog.appendChild(okButton);
  document.body.appendChild(dialog);

  return dialog;
}
