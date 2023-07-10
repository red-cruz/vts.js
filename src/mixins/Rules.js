// @ts-check
import VtsFormValidator from '../utils/VtsFormValidator';
import getFieldLabel from '../utils/getFieldLabel';

/** @type {import('../ValidateThenSubmit').VtsRulesMixin} */
const vtsRules = {
  _applyRules(rules, fieldValue, fieldData) {
    let valid = false;
    let matchValue = '';
    let pattern = rules.pattern;
    /** @type {*} */
    let matchingField;
    const isMatch = 'match' in rules && !pattern;
    if (isMatch) {
      matchingField = VtsFormValidator.validateField(this.form, rules.match);
      matchValue = matchingField.value;
      pattern = rules.flags?.includes('g')
        ? matchValue + '\\b'
        : `^${matchValue}$`;
    }

    const regExp = new RegExp(pattern, rules.flags);

    if (regExp.test(fieldValue)) {
      fieldData.message = rules.message?.valid;
      valid = true;
    } else {
      fieldData.message = rules.message?.invalid;
    }

    if (isMatch) {
      fieldData.message = fieldData.message
        ?.replace(/\${targetValue}/g, matchValue)
        .replace(/\${targetLabel}/g, getFieldLabel(matchingField, this.form));
    }

    if ('pattern' in rules && 'match' in rules) {
      console.warn(
        `Both "pattern" and "match" properties exist in the field rule for ${fieldData.label}. ` +
          'Ignoring the "match" property.'
      );
    }

    return [valid, fieldData];
  },

  _getFieldRules(fieldName) {
    const rules = this.config.rules;

    if (rules && rules instanceof Map) {
      return rules.get(fieldName);
    }

    return undefined;
  },
  _convertRulesToMap() {
    const rules = this.config.rules;
    const rulesMap = new Map();

    for (const fieldName in rules) {
      if (Object.prototype.hasOwnProperty.call(rules, fieldName)) {
        rulesMap.set(fieldName, rules[fieldName]);
      }
    }

    this.config.rules = rulesMap;
  },
};

export default vtsRules;
