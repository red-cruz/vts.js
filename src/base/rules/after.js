// @ts-check
import defaultMsg from '../../defaults/defaultMsg';
import { replaceDateMsg } from '../../utils/validation/replaceMessage';

/**
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default} Vts
 * @returns {import('../../types/base/validation').VtsValidationMessages}
 */
export default function afterRule(rules, field, label) {
  const after = rules?.after;
  if (!after) return {};

  let targetDate, targetField;

  if (typeof after === 'string') {
    const rule = this._dateRule('after', rules, field);
    if (!rule) return {};

    targetDate = rule.targetDate;
    targetField = rule.targetField;
  } else {
    targetDate = after(field, label);
  }

  const fieldDate = new Date(field.value);

  const message =
    fieldDate > targetDate
      ? ''
      : rules.message?.after || this.message.after || defaultMsg.after;

  return { after: replaceDateMsg(message, targetField, targetDate) };
}
