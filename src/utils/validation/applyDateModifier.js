// @ts-check
/**
 *
 * @param {string} dateRule
 * @param {Date} targetDate
 */
export default function applyDateModifier(dateRule, targetDate) {
  // Extract the modifier and its value using a regular expression
  const modifierRegex = /(\+|-)?([\d]+)\s*(week|day|hour|minute|second)/g;
  const modifierMatch = modifierRegex.exec(dateRule);

  if (!modifierMatch) return null;

  const modifierSign = modifierMatch[1] || '+'; // Default to '+' if not specified
  const modifierValue = parseInt(modifierMatch[2]);
  const modifierUnit = modifierMatch[3];

  const adjustedValue = modifierSign === '+' ? modifierValue : -modifierValue;

  switch (modifierUnit) {
    case 'week':
      targetDate.setDate(targetDate.getDate() + adjustedValue * 7);
      break;
    case 'day':
      targetDate.setDate(targetDate.getDate() + adjustedValue);
      break;
    case 'hour':
      targetDate.setHours(targetDate.getHours() + adjustedValue);
      break;
    case 'minute':
      targetDate.setMinutes(targetDate.getMinutes() + adjustedValue);
      break;
    case 'second':
      targetDate.setSeconds(targetDate.getSeconds() + adjustedValue);
      break;
  }
  const offset = modifierValue > 1 ? modifierMatch[3] + 's' : modifierMatch[3];
  return modifierValue + ' ' + offset;
}
