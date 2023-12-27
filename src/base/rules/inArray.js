// @ts-check
import defaultMsg from '../../defaults/defaultMsg';

/**
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default} Vts
 * @returns {Promise<import('../../types/base/validation').VtsValidationMessages>}
 */
export default async function inArrayRule(rules, field, label) {
  const inArray = rules?.inArray;
  if (!inArray) return {};

  const message =
    rules.message?.inArray || this.message.inArray || defaultMsg.inArray;

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
        inArray: message.replace(/{:values}/g, arr.join(', ')),
      };
}