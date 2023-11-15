// @ts-check

/**
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default} Vts
 * @returns {string}
 */
export default function patternRule(rules, field, label) {
  const pattern = rules.pattern;
  if (!pattern) return '';

  return pattern.test(field.value)
    ? ''
    : rules.message?.invalid || this.message.invalid || `Invalid ${label}`;
}
