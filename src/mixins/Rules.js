import getFieldLabel from '../utils/getFieldLabel';

const vtsRules = {
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
    const matchingField = this.form.querySelector(`[name="${rules.match}"]`);
    const matchValue = matchingField.value;
    const regExp = new RegExp(`^${matchValue}$`, rules.flags);

    if (regExp.test(fieldValue)) {
      fieldData.message = rules.message?.valid;
      valid = true;
    } else {
      fieldData.message = rules.message?.invalid;
    }
    fieldData.message = fieldData.message
      ?.replaceAll('${targetValue}', matchValue)
      .replaceAll('${targetLabel}', getFieldLabel(matchingField, this.form));
    return [valid, fieldData];
  },
  _getFieldRules(fieldName) {
    return this.config.rules.get(fieldName);
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
