// @ts-check
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

  let targetDate, targetField;

  if (typeof after === 'string') {
    const rule = this._dateRule('after', rules, field);
    if (!rule) return '';

    targetDate = rule.targetDate;
    targetField = rule.targetField;
  } else {
    targetDate = after(field, label);
  }

  const fieldDate = new Date(field.value);

  const message =
    fieldDate > targetDate
      ? ''
      : rules.message?.invalid ||
        this.message.invalid ||
        `${label} must be after ${
          targetField?.value || targetDate.toLocaleString()
        }`;

  console.log(targetDate.toLocaleString());
  return message?.replace(
    /:{targetValue}/g,
    targetField?.value ?? targetDate.toLocaleString()
  );
  // .replace(/:{targetLabel}/g, getFieldLabel(targetField, this.form));
}
