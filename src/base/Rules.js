// @ts-check
import defaultMsg from '../defaults/defaultMsg';
import VtsFormValidator from '../utils/VtsFormValidator';
import attachEvent from '../utils/attachEvent';
import applyDateModifier from '../utils/validation/applyDateModifier';
import afterRule from './rules/after';
import equalToRule from './rules/equalTo';
import inArrayRule from './rules/inArray';
import patternRule from './rules/pattern';
import { requiredIfRule, requiredRule } from './rules/required';
import sizeRule from './rules/size';
import validatorRule from './rules/validator';

const registeredRules = [
  afterRule,
  equalToRule,
  inArrayRule,
  patternRule,
  requiredIfRule,
  requiredRule,
  sizeRule,
  validatorRule,
];

/** @type {import('../types/base/rules').default} */
const vtsRules = {
  _getFieldRules(fieldName) {
    const rules = this.rules;

    if (rules && rules instanceof Map) {
      return rules.get(fieldName);
    }

    return undefined;
  },

  _dateRule(rule, rules, field) {
    const targetField = VtsFormValidator.validateField(this.form, rules[rule]);

    if (!targetField) {
      console.warn(
        `The element with name "${rule}" is not a valid field element. 
            Please ensure you are passing the name of a valid field in the form.`
      );
      return targetField;
    }

    attachEvent(rule, targetField, field, rules);

    const targetDate = new Date(targetField.value);
    applyDateModifier(rules[rule], targetDate);

    return {
      targetField,
      targetDate,
    };
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

  _setCheckingRule(rules, field, label) {
    const checking = (
      rules.message?.checking ||
      this.message.checking ||
      defaultMsg.checking
    )
      .replace(/:{value}/g, field.value)
      .replace(/:{label}/g, label);

    field.setCustomValidity(checking);

    const fieldName = field.getAttribute('name') || field.name;
    this._data.validFields.delete(fieldName);
    this._data.invalidFields.set(fieldName, {
      field,
      messages: { checking },
      label,
    });

    this._reportValidity();
  },
};

export default vtsRules;
export { registeredRules };
