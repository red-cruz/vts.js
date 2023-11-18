// @ts-check
import VtsFormValidator from '../../utils/VtsFormValidator';
import attachEvent from '../../utils/attachEvent';
import getFieldLabel from '../../utils/getFieldLabel';

/**
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default} Vts
 * @returns {string}
 */
export default function afterRule(rules, field, label) {
  const after = rules.after;
  if (!after) return '';

  let targetField = VtsFormValidator.validateField(this.form, after);

  if (!targetField) {
    console.warn(
      `The element with name "${after}" is not a valid field element. 
          Please ensure you are passing the name of a valid field in the form.`
    );
    return '';
  }

  attachEvent('after', targetField, field, rules);

  const targetDate = new Date(targetField.value);
  const value = new Date(field.value);

  // Extract the date modifier using a regular expression
  const modifierRegex = /\+([\d]+)\s*(week|day|hour|minute|second)/g;
  const modifierMatch = modifierRegex.exec(rules.after);

  if (modifierMatch) {
    const modifierValue = parseInt(modifierMatch[1]);
    const modifierUnit = modifierMatch[2];

    switch (modifierUnit) {
      case 'week':
        targetDate.setDate(targetDate.getDate() + 7 * modifierValue);
        break;
      case 'day':
        targetDate.setDate(targetDate.getDate() + modifierValue);
        break;
      case 'hour':
        targetDate.setHours(targetDate.getHours() + modifierValue);
        break;
      case 'minute':
        targetDate.setMinutes(targetDate.getMinutes() + modifierValue);
        break;
      case 'second':
        targetDate.setSeconds(targetDate.getSeconds() + modifierValue);
        break;
    }
  }

  console.log(targetDate, value);
  console.log(modifierRegex, modifierMatch, rules.after);

  const message =
    value > targetDate
      ? ''
      : rules.message?.invalid ||
        this.message.invalid ||
        `${label} must be after ${targetField.value}`;

  return message
    ?.replace(/:{targetValue}/g, targetField.value)
    .replace(/:{targetLabel}/g, getFieldLabel(targetField, this.form));
}
