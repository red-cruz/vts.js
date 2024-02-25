// @ts-check
import defaultMsg from '../../defaults/defaultMsg';

/**
 * @param {import('../../types/config/rules').Rules[string]} rules
 * @param {import('../../types/core/index').VtsField} field
 * @param {string} label
 * @this {import('../../types/core/index').default} Vts
 * @returns {import('../../types/core/validation').ValidationResults}
 */
export default function startsWithRule(rules, field, label) {
  const startsWith = rules.startsWith || field.dataset['vts-rule-startsWith'];
  if (!startsWith) return {};

  const messages =
    rules.messages?.startsWith ||
    this.messages?.startsWith ||
    defaultMsg.startsWith;

  return field.value.startsWith(String(startsWith))
    ? {}
    : {
        startsWith: messages.replace(/{:startsWith}/g, String(startsWith)),
      };
}
