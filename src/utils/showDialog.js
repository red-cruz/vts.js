// @ts-check
import isMsgHTMLorScript from './isMsgHTMLorScript';

const dialogId = '__Vts_dialog';
const dialogMsgId = `${dialogId}_message`;

/**
 * @param {string} title
 * @param {string} message
 */
export default function showDialog(title, message) {
  let existingDialog = document.getElementById(dialogId);
  if (existingDialog instanceof HTMLDialogElement) {
    const messageSection = existingDialog.querySelector(`#${dialogMsgId}`);
    if (messageSection instanceof HTMLDivElement) {
      if (isMsgHTMLorScript(message)) {
        createAnchor(existingDialog, messageSection, message);
      } else {
        messageSection.textContent = message;
      }
    }
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

/**
 * @param {string} title
 * @param {string} message
 */
function fallBackAlert(title, message) {
  // add line breaks for better readability
  message = `\n\n${message}`;

  // prevent the script or html from being displayed in the alert message
  if (isMsgHTMLorScript(message)) message = '';

  const confirmed = confirm(`\n${title}.${message}`);
  if (confirmed) openNewWindow(message);
}

/**
 * @param {string} title
 * @param {string} message
 * @returns {HTMLDialogElement}
 */
function createDialog(title, message) {
  const dialog = document.createElement('dialog');
  dialog.id = dialogId;

  // create title container
  const titleBar = document.createElement('div');
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

/**
 * @param {HTMLDialogElement} dialog
 * @param {HTMLDivElement} messageSection
 * @param {*} message
 */
function createAnchor(dialog, messageSection, message) {
  // create anchor
  const anchor = document.createElement('a');
  anchor.href = '#';
  anchor.role = 'button';
  anchor.onclick = () => {
    dialog.close();
    openNewWindow(message);
  };
  anchor.textContent = 'Click here to view more details.';
  messageSection.textContent = '';
  messageSection.appendChild(anchor);
}

/**
 * @description
 * @author RED
 * @param {string} message
 */
function openNewWindow(message) {
  const newWindow = window.open();
  if (newWindow) {
    if (message.startsWith('<!DOCTYPE html>')) {
      newWindow.document.write(message);
      newWindow.stop();
    } else {
      newWindow.document.body.outerHTML = message;
    }
  }
}
