// @ts-check
import defaultMsg from '../../defaults/defaultMsg';

/**
 * @param {import('../../types/config/rules').Rules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default} Vts
 * @returns {import('../../types/base/validation').ValidationResults}
 */
export default function endsWithRule(rules, field, label) {
  const endsWith = rules?.endsWith || field.dataset['vts-rule-endsWith'];
  if (!endsWith) return {};

  const messages =
    rules.messages?.endsWith || this.messages?.endsWith || defaultMsg.endsWith;

  return field.value.endsWith(String(endsWith))
    ? {}
    : {
        endsWith: messages.replace(/{:endsWith}/g, String(endsWith)),
      };
}
