// @ts-check
import VtsFormValidator from '../utils/VtsFormValidator';
import getFieldLabel from '../utils/getFieldLabel';

/** @type {import('../ValidateThenSubmit').VtsRulesMixin} */
const vtsRules = {
  _applyRules(rules, field, label) {
    let message = this.message.invalid || '';
    let pattern = 'pattern' in rules ? rules.pattern : '';
    const isMatch = 'match' in rules && !pattern;

    if (isMatch) {
      // get matching field
      const matchingField = VtsFormValidator.validateField(
        this.form,
        rules.match
      );
      // get value
      const matchValue = matchingField.value;
      // overwrite pattern
      pattern = rules.flags?.includes('g')
        ? matchValue + '\\b'
        : `^${matchValue}$`;
      // replace message placeholders
      message
        ?.replace(/\${targetValue}/g, matchValue)
        .replace(/\${targetLabel}/g, getFieldLabel(matchingField, this.form));
    }

    const regExp = new RegExp(pattern, rules.flags);

    if (regExp.test(field.value)) {
      message = rules.message?.valid || this.message.valid || '';
      field.setCustomValidity('');
    } else {
      message = rules.message?.invalid || message;
      field.setCustomValidity(message);
    }

    if ('pattern' in rules && 'match' in rules) {
      console.warn(
        `Both "pattern" and "match" properties exist in the field rule for ${label}. ` +
          'Ignoring the "match" property.'
      );
    }
    console.warn(label + ': ' + message);
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
