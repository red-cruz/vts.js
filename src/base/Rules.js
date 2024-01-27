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
    /** @type {Map<string,import('../types/config/rules').VtsRules[string]>} */
    const rulesMap = new Map();

    /** @type {import('../types/config/rules').VtsRules[string]} */
    const rules = this.rules;

    // map field constraints
    this.fields.forEach((field) => {
      const ruleName = field.dataset.vtsRule || field.name;
      const definedRules = rules[ruleName] || {};

      const { vtsRuleAfter, vtsRuleRequired } = field.dataset;

      mergeRules(
        {
          min: extractRule(vtsRuleAfter),
          required: vtsRuleRequired === 'true' ?? field.required,
        },
        definedRules
      );

      if (field instanceof HTMLInputElement) {
        if (field.type === 'checkbox' || field.type === 'radio') {
          //
        } else {
          //
        }
      } else if (field instanceof HTMLSelectElement) {
        //
      } else {
        //
      }

      /**
       * @param {import('../types/config/rules').VtsRules[string]} attrRules
       * @param {import('../types/config/rules').VtsRules[string]} [mainRules=definedRules]
       */
      function mergeRules(
        attrRules,
        mainRules = (() => rulesMap.get(ruleName))()
      ) {
        const mergedRuleObj = Object.assign(attrRules, mainRules);

        // filter undefined
        Object.keys(mergedRuleObj).forEach(
          (key) => mergedRuleObj[key] === undefined && delete mergedRuleObj[key]
        );

        // set the rule
        rulesMap.set(ruleName, mergedRuleObj);
      }
    });

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

/**
 * @param {string} [rule]
 */
function extractRule(rule) {
  if (rule)
    return rule.startsWith('window.')
      ? window[rule.replace('window.', '')]()
      : rule;
}
