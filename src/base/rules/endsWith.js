// @ts-check
import defaultMsg from '../../defaults/defaultMsg';

/**
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default} Vts
 * @returns {import('../../types/base/validation').VtsValidationResults}
 */
export default function endsWithRule(rules, field, label) {
  const endsWith = rules?.endsWith;
  if (!endsWith) return {};

  const message =
    rules.message?.endsWith || this.message.endsWith || defaultMsg.endsWith;

  return field.value.endsWith(String(endsWith))
    ? {}
    : {
        endsWith: message.replace(/{:endsWith}/g, String(endsWith)),
      };
}
