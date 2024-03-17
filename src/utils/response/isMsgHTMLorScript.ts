/**
 * Checks if the message contains HTML or script
 *
 * @param message The message to check.
 * @returns  True if the message contains HTML or script, false otherwise.
 */
export default function (message: any) {
  if (typeof message !== 'string') return false;

  return message.startsWith('<!DOCTYPE html>') || message.startsWith('<script>');
}
