// @ts-check
import defaultMsg from '../../defaults/defaultMsg';

/**
 * @param {import('../../types/config/rules').Rules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default} Vts
 * @returns {import('../../types/base/validation').ValidationResults}
 */
export default function sizeRule(rules, field, label) {
  const size = rules?.size || Number(field.dataset.vtsRuleSize);
  if (!size) return {};

  const messages =
    rules.messages?.size || this.messages?.size || defaultMsg.size;
  return size === field.value.length
    ? {}
    : {
        size: messages.replace(/{:size}/g, String(size)),
      };
}
