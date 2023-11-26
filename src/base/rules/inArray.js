// @ts-check
import defaultMsg from '../../defaults/defaultMsg';

/**
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default} Vts
 * @returns {import('../../types/base/validation').VtsValidationMessages}
 */
export default function inArrayRule(rules, field, label) {
  const inArray = rules?.inArray;
  if (!inArray) return {};

  const message =
    rules.message?.inArray || this.message.inArray || defaultMsg.inArray;

  return inArray.includes(field.value)
    ? {}
    : {
        inArray: message.replace(/{:values}/g, inArray.join(', ')),
      };
}
