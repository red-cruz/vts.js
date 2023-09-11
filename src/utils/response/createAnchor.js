// @ts-check

import openNewWindow from './openNewWindow';

/**
 * @param {HTMLDialogElement} dialog
 * @param {HTMLDivElement} messageSection
 * @param {*} message
 */
export default function createAnchor(dialog, messageSection, message) {
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
