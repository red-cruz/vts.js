// @ts-check

/**
 * @description
 * @author RED
 * @param {string} message
 */
export default function openNewWindow(message) {
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
