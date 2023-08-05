// @ts-check
import VtsFValidator from '../utils/VtsFormValidator';
import getFieldLabel from '../utils/getFieldLabel';

/** @type {import('../vts').VtsRulesMixin} */
const vtsRules = {
  _applyRules(rules, field, label) {
    let message = this.message.invalid || 'Invalid field';
    let pattern = 'pattern' in rules ? rules.pattern : '';
    const isMatch = 'match' in rules && !pattern;
    /** @type {*} */
    let matchingField;
    let matchValue = '';
    if (isMatch) {
      // get matching field target
      matchingField = VtsFValidator.validateField(this.form, rules.match);
      // get value of target field
      matchValue = matchingField.value;
      // overwrite pattern
      pattern = rules.flags?.includes('g')
        ? matchValue + '\\b'
        : `^${matchValue}$`;
    }

    const dependent = rules.requires;
    let neededField = null;
    if (dependent) {
      neededField = VtsFValidator.validateField(this.form, dependent);
      if (neededField.value) {
        field.required = true;
        field.disabled = false;
      } else {
        field.disabled = true;
        field.required = false;
      }
      neededField = neededField.value;
    }

    // set validity
    const regExp = new RegExp(pattern, rules.flags);
    if (!neededField || regExp.test(field.value)) {
      message = rules.message?.valid ?? this.message.valid ?? '';
      field.setCustomValidity('');
    } else {
      message = rules.message?.invalid ?? message;
      field.setCustomValidity(message);
    }

    // replace message placeholders for 'match'
    if ('match' in rules) {
      message = message
        ?.replace(/\${targetValue}/g, matchValue)
        .replace(/\${targetLabel}/g, getFieldLabel(matchingField, this.form));
    }

    warnMultiRule(rules, label);

    return message;
  },

  _getFieldRules(fieldName) {
    const rules = this.rules;

    if (rules && rules instanceof Map) {
      return rules.get(fieldName);
    }

    return undefined;
  },
  _convertRulesToMap() {
    const rules = this.rules;
    const rulesMap = new Map();

    for (const fieldName in rules) {
      if (Object.prototype.hasOwnProperty.call(rules, fieldName)) {
        rulesMap.set(fieldName, rules[fieldName]);
      }
    }

    this.rules = rulesMap;
  },
};

export default vtsRules;
/**
 * Displays a warning message if both "pattern" and "match" properties exist in the field rule.
 *
 * @private
 * @param {import('../types/rules').VtsRules[string]} rules - The validation rules for the field.
 * @param {string} label - The label of the field.
 */
function warnMultiRule(rules, label) {
  if ('pattern' in rules && 'match' in rules) {
    console.warn(
      `Both "pattern" and "match" properties exist in the field rule for ${label}. ` +
        'Ignoring the "match" property.'
    );
  }
}
