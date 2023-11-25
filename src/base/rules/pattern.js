// @ts-check

import defaultMsg from '../../defaults/defaultMsg';

/**
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default} Vts
 * @returns {import('../../types/base/validation').VtsValidationMessages}
 */
export default function patternRule(rules, field, label) {
  const pattern = rules?.pattern;
  if (!pattern) return {};

  return pattern.test(field.value)
    ? {}
    : {
        pattern:
          rules.message?.patternMismatch ||
          this.message.patternMismatch ||
          defaultMsg.patternMismatch,
      };
}
