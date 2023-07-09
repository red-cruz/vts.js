// @ts-check
import VtsFormValidator from '../utils/Check';
import getFieldLabel from '../utils/getFieldLabel';

/** @type {import('../ValidateThenSubmit').VtsRulesMixin} */
const vtsRules = {
  /**
   * @private
   */
  _applyRules(rules, fieldValue, fieldData) {
    let valid = false;
    const regExp = new RegExp(rules.pattern, rules.flags);

    if (regExp.test(fieldValue)) {
      fieldData.message = rules.message?.valid;
      valid = true;
    } else {
      fieldData.message = rules.message?.invalid;
    }
    return [valid, fieldData];
  },
  _applyMatch(rules, fieldValue, fieldData) {
    let valid = false;
    const matchingField = VtsFormValidator.validateField(
      this.form,
      rules.match,
      fieldData.label
    );
    this.form.querySelector(`[name="${rules.match}"]`);

    const matchValue = matchingField.value;
    const regExp = new RegExp(`^${matchValue}$`, rules.flags);

    if (regExp.test(fieldValue)) {
      fieldData.message = rules.message?.valid;
      valid = true;
    } else {
      fieldData.message = rules.message?.invalid;
    }

    fieldData.message = fieldData.message
      ?.replace(/\${targetValue}/g, matchValue)
      .replace(/\${targetLabel}/g, getFieldLabel(matchingField, this.form));
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
