// @ts-check
import defaultMsg from '../../defaults/defaultMsg';

/**
 * @param {import('../../types/config/rules').Rules[string]} rules
 * @param {import('../../types/core').VtsField} field
 * @param {string} label
 * @this {import('../../types/core').default} Vts
 * @returns {Promise<import('../../types/core/validation').ValidationResults>}
 */
export default async function notInArrayRule(rules, field, label) {
  const dataset = field.dataset['vts-rule-notInArray'];
  const notInArray = rules.notInArray || (dataset ? JSON.parse(dataset) : null);

  if (!notInArray) return {};
  const messages =
    rules.messages?.notInArray ||
    this.messages?.notInArray ||
    defaultMsg.notInArray;

  let arr = [];
  if (typeof notInArray === 'function') {
    this._setCheckingRule(rules, field, label);
    arr = await notInArray(field, label, this.form);
  } else {
    arr = notInArray;
  }

  return !arr.includes(field.value)
    ? {}
    : {
        notInArray: messages.replace(/{:values}/g, arr.join(', ')),
      };
}
