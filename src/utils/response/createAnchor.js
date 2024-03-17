// @ts-check

import openNewWindow from './openNewWindow';

/**
 * Creates an anchor element with the given message.
 * When the anchor element is clicked, it opens a new window with the given message.
 *
 * @param {HTMLDialogElement} dialog The dialog element that the anchor will be added to.
 * @param {HTMLDivElement} messageSection The message section of the dialog element.
 * @param {string} title The title of the alert dialog.
 * @param {*} message The message that will be opened in the new window.
 */
export default function createAnchor(dialog, messageSection, title, message) {
  // Create an anchor element
  const anchor = document.createElement('a');
  anchor.href = '#';
  anchor.role = 'button';
  anchor.onclick = () => {
    dialog.close();
    openNewWindow(title, message);
  };
  anchor.textContent = 'Click here to view more details';

  // Add the anchor element to the message section
  messageSection.innerHTML = '';
  messageSection.appendChild(anchor);
}
