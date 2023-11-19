// @ts-check
/**
 * @param {string} message
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement| undefined} targetField
 * @param {Date|Promise<Date>} targetDate
 * @return {string}
 */
export function replaceDateMsg(message, targetField, targetDate) {
  const dateStr =
    targetDate instanceof Date && !isNaN(targetDate.valueOf())
      ? targetDate.toLocaleString()
      : 'the specified date';

  message = message.replace(/{:targetValue}/g, targetField?.value || dateStr);

  return message;
}
