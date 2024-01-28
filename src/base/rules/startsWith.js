// @ts-check
import defaultMsg from '../../defaults/defaultMsg';

/**
 * @param {import('../../types/config/rules').Rules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default} Vts
 * @returns {import('../../types/base/validation').ValidationResults}
 */
export default function startsWithRule(rules, field, label) {
  const startsWith = rules?.startsWith || field.dataset['vts-rule-startsWith'];
  if (!startsWith) return {};

  const message =
    rules.message?.startsWith ||
    this.message?.startsWith ||
    defaultMsg.startsWith;

  return field.value.startsWith(String(startsWith))
    ? {}
    : {
        startsWith: message.replace(/{:startsWith}/g, String(startsWith)),
      };
}
