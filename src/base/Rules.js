// @ts-check
import defaultMsg from '../defaults/defaultMsg';
import { afterOrEqual, afterRule, before, beforeOrEqual } from './rules/date';
import differentFrom from './rules/differentFrom';
import endsWithRule from './rules/endsWith';
import equalToRule from './rules/equalTo';
import inArrayRule from './rules/inArray';
import maxRule from './rules/max';
import minRule from './rules/min';
import notInArrayRule from './rules/notInArray';
import patternRule from './rules/pattern';
import { requiredIfRule, requiredRule } from './rules/required';
import sizeRule from './rules/size';
import startsWithRule from './rules/startsWith';
import validatorRule from './rules/validator';

const registeredRules = [
  requiredRule,
  requiredIfRule,

  afterRule,
  afterOrEqual,
  before,
  beforeOrEqual,
  endsWithRule,
  differentFrom,
  equalToRule,
  inArrayRule,
  maxRule,
  minRule,
  notInArrayRule,
  patternRule,
  sizeRule,
  startsWithRule,
  validatorRule,
];

/** @type {import('../types/base/rules').default} */
const vtsRules = {
  _getFieldRules(field) {
    const rule = field.dataset.vtsRule || field.name;
    return this.rules.get(rule);
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
      this.message?.checking ||
      defaultMsg.checking
    )
      .replace(/{:value}/g, field.value)
      .replace(/{:label}/g, label);

    field.setCustomValidity(checking);
    this.renderFeedback.call(field, { checking }, this.class.invalid);
  },
};

export default vtsRules;
export { registeredRules };
