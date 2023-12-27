// @ts-check
import defaultMsg from '../../defaults/defaultMsg';
import isRequiredAndInvalid from './required';

/**
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default} Vts
 * @returns {Promise<import('../../types/base/validation').VtsValidationMessages>}
 */
export default async function notInArrayRule(rules, field, label) {
  const notInArray = rules?.notInArray;
  if (!notInArray) return {};
  const message =
    rules.message?.notInArray ||
    this.message.notInArray ||
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
        notInArray: message.replace(/{:values}/g, arr.join(', ')),
      };
}