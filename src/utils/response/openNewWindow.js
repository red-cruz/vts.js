// @ts-check

/**
 * Opens a new window with the given message.
 *
 * @param {string} title The title to be displayed in the new window.
 * @param {string} message The message to be displayed in the new window.
 */
export default function openNewWindow(title, message) {
  const newWindow = window.open();
  if (newWindow) {
    newWindow.document.title = title + ' - ' + window.document.title;
    if (message.startsWith('<!DOCTYPE html>') || message.startsWith('<html>')) {
      newWindow.document.write(message);
      newWindow.stop();
    } else {
      newWindow.document.body.outerHTML = message;
    }
  }
}
