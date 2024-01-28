// @ts-check

import defaultMsg from '../../defaults/defaultMsg';

/**
 * @param {import('../../types/config/rules').Rules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default} Vts
 * @returns {import('../../types/base/validation').ValidationResults}
 */
export default function patternRule(rules, field, label) {
  const dataset = field.dataset.vtsRulePattern;
  const pattern = rules.pattern || (dataset ? RegExp(dataset) : null);
  if (!pattern) return {};

  return pattern.test(field.value)
    ? {}
    : {
        pattern:
          rules.messages?.pattern ||
          this.messages?.pattern ||
          defaultMsg.pattern,
      };
}
