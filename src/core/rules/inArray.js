// @ts-check
import defaultMsg from '../../defaults/defaultMsg';

/**
 * @param {import('../../types/config/rules').Rules[string]} rules
 * @param {import('../../types/core').VtsField} field
 * @param {string} label
 * @this {import('../../types/core').default} Vts
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

  let isValid = arr.includes(field.value);

  if (field instanceof HTMLSelectElement && field.type === 'select-multiple') {
    const selectedOptions = [];

    for (const option of field.options) {
      if (option.selected) {
        selectedOptions.push(option.value);
      }
    }
    isValid = selectedOptions.every((item) => arr.includes(item));
  }

  return isValid
    ? {}
    : {
        inArray: messages.replace(/{:inArray}/g, arr.join(', ')),
      };
}
