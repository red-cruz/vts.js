// @ts-check

import defaultMsg from '../../defaults/defaultMsg';

/**
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default} Vts
 * @returns {import('../../types/base/validation').VtsValidationResults}
 */
export default function patternRule(rules, field, label) {
  const dataset = field.dataset.vtsRulePattern;
  const pattern = rules?.pattern || (dataset ? RegExp(dataset) : null);
  if (!pattern) return {};

  return pattern.test(field.value)
    ? {}
    : {
        pattern:
          rules.message?.pattern || this.message?.pattern || defaultMsg.pattern,
      };
}
