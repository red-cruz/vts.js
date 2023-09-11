/**
 * @param {*} message
 * @returns {boolean}
 */
export default function isMsgHTMLorScript(message) {
  if (typeof message === 'string')
    return (
      message.startsWith('<!DOCTYPE html>') || message.startsWith('<script>')
    );

  return false;
}
