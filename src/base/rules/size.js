// @ts-check
import defaultMsg from '../../defaults/defaultMsg';

/**
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default} Vts
 * @returns {import('../../types/base/validation').VtsValidationMessages}
 */
export default function sizeRule(rules, field, label) {
  const size = rules?.size;
  if (!size) return {};

  const message = rules.message?.size || this.message.size || defaultMsg.size;
  return size === field.value.length
    ? {}
    : {
        size: message.replace(/{:size}/g, String(size)),
      };
}
