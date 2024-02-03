// @ts-check
import defaultMsg from '../../defaults/defaultMsg';

/**
 * @param {import('../../types/config/rules').Rules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/core/index').default} Vts
 * @returns {Promise<import('../../types/core/validation').ValidationResults>}
 */
export default async function inArrayRule(rules, field, label) {
  const dataset = field.dataset['vts-rule-inArray'];
  const inArray = rules.inArray || (dataset ? JSON.parse(dataset) : null);
  if (!inArray) return {};

  const messages =
    rules.messages?.inArray || this.messages?.inArray || defaultMsg.inArray;

  let arr = [];
  if (typeof inArray === 'function') {
    this._setCheckingRule(rules, field, label);
    arr = await inArray(field, label, this.form);
  } else {
    arr = inArray;
  }

  return arr.includes(field.value)
    ? {}
    : {
        inArray: messages.replace(/{:values}/g, arr.join(', ')),
      };
}
