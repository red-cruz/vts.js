// @ts-check
import defaultMsg from '../defaults/defaultMsg';
import VtsFormValidator from '../utils/VtsFormValidator';
import attachEvent from '../utils/attachEvent';
import applyDateModifier from '../utils/validation/applyDateModifier';
import { afterOrEqual, afterRule, before, beforeOrEqual } from './rules/date';
import differentFrom from './rules/differentFrom';
import equalToRule from './rules/equalTo';
import inArrayRule from './rules/inArray';
import notInArrayRule from './rules/notInArray';
import patternRule from './rules/pattern';
import { requiredIfRule, requiredRule } from './rules/required';
import sizeRule from './rules/size';
import validatorRule from './rules/validator';

const registeredRules = [
  afterRule,
  afterOrEqual,
  before,
  beforeOrEqual,
  differentFrom,
  equalToRule,
  inArrayRule,
  notInArrayRule,
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
