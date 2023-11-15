// @ts-check

/**
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default}
 * @returns {string}
 */
export default function patternRule(rules, field, label) {
  const pattern = rules.pattern;
  if (!pattern) return '';

  if (pattern.test(field.value)) {
    return rules.message?.valid ?? this.message.valid ?? '';
  } else {
    return rules.message?.invalid || this.message.invalid || `Invalid ${label}`;
  }
}
