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
import { requiredRule } from './rules/required';
import sizeRule from './rules/size';
import startsWithRule from './rules/startsWith';
import validatorRule from './rules/validator';

const registeredRules = [
  requiredRule,
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

/** @type {import('../types/core/rules').default} */
const vtsRules = {
  _getFieldRules(field) {
    const rule = field.dataset.vtsRule || field.name;
    return this.rules.get(rule) || {};
  },

  _convertRulesToMap() {
    /** @type {Map<string,import('../types/config/rules').Rules[string]>} */
    const rulesMap = new Map();

    /** @type {import('../types/config/rules').Rules[string]} */
    const rules = this.rules;

    // map field constraints
    this.fields.forEach((field) => {
      const ruleName = field.dataset.vtsRule || field.name;
      const definedRules = rules[ruleName] || {};

      // get default rules from field dataset
      let rulesFromDataset = Object.entries(field.dataset)
        .filter(([key]) => key.startsWith('vtsRule') && key !== 'vtsRule')
        .reduce(
          /**
           * @param {import('../types/config/rules').Rules[string]} rules
           */
          (rules, [key, value]) => {
            const rKey = key.slice('vtsRule'.length);
            const ruleKey = parseRuleKey(rKey);

            // parse
            const extractedRule = extractRule(value);
            if (extractedRule instanceof Function) {
              rules[ruleKey] = extractedRule;
            } else if (typeof extractedRule === 'string') {
              if (extractedRule.startsWith('field:')) {
                // let core rules get the value of the matching field
                rules[ruleKey] = extractedRule;
              } else {
                // parse rules based on rule
                switch (ruleKey) {
                  case 'after':
                  case 'afterOrEqual':
                  case 'before':
                  case 'beforeOrEqual':
                    rules[ruleKey] = new Date(extractedRule);
                    break;

                  case 'max':
                  case 'maxlength':
                  case 'maxWords':
                  case 'min':
                  case 'minlength':
                  case 'minWords':
                  case 'size':
                    rules[ruleKey] = Number(extractedRule);
                    break;

                  case 'pattern':
                    rules[ruleKey] = new RegExp(extractedRule);
                    break;

                  case 'required':
                    rules[ruleKey] = value !== 'false' ?? field.required;
                    break;

                  case 'inArray':
                  case 'notInArray':
                    try {
                      const obj = JSON.parse(extractedRule);
                      rules[ruleKey] = Object.values(obj);
                    } catch (error) {
                      rules[ruleKey] = extractedRule
                        .split(',')
                        .map((val) => val.trim());
                    }
                    break;

                  default:
                    rules[ruleKey] = extractedRule;
                    break;
                }
              }
            } else {
              // allow data attribute usage without value
              if (ruleKey === 'required') {
                rules[ruleKey] = value !== 'false' ?? field.required;
              }
            }

            return rules;
          },
          {}
        );

      // get default rules from field attributes
      mergeToDatasetRules({
        required: field.required,
      });

      if (field instanceof HTMLInputElement) {
        mergeToDatasetRules({
          maxLength: field.maxLength < 1 && undefined,
          minLength: field.minLength < 1 && undefined,
        });

        switch (field.type) {
          case 'date':
          case 'datetime-local':
            mergeToDatasetRules({
              afterOrEqual: field.min ? new Date(field.min) : undefined,
              beforeOrEqual: field.max ? new Date(field.max) : undefined,
            });
            break;
          case 'number':
            mergeToDatasetRules({
              min: field.min ? Number(field.min) : undefined,
              max: field.max ? Number(field.max) : undefined,
            });
            break;
        }
      }

      const mergedRuleObj = Object.assign(rulesFromDataset, definedRules);

      // filter undefined
      Object.keys(mergedRuleObj).forEach(
        (key) => mergedRuleObj[key] === undefined && delete mergedRuleObj[key]
      );

      // set the rule
      rulesMap.set(ruleName, mergedRuleObj);

      function mergeToDatasetRules(obj) {
        rulesFromDataset = Object.assign(obj, rulesFromDataset);
      }
    });

    this.rules = rulesMap;
  },

  _setCheckingRule(rules, field, label) {
    const checking = (
      rules.messages?.checking ||
      this.messages?.checking ||
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
 * @returns {string|undefined|import('../types/config/rules').RuleFunction<any>}
 */
function extractRule(rule) {
  if (rule)
    return rule.startsWith('window.')
      ? window[rule.replace('window.', '')]
      : rule;
}

/**
 * @param {string} key
 */
function parseRuleKey(key) {
  switch (key.toLocaleLowerCase()) {
    case 'afterOrEqual'.toLocaleLowerCase():
      return 'afterOrEqual';

    case 'beforeOrEqual'.toLocaleLowerCase():
      return 'beforeOrEqual';

    case 'differentFrom'.toLocaleLowerCase():
      return 'differentFrom';

    case 'endsWith'.toLocaleLowerCase():
      return 'endsWith';

    case 'equalTo'.toLocaleLowerCase():
      return 'equalTo';

    case 'inArray'.toLocaleLowerCase():
      return 'inArray';

    case 'maxLength'.toLocaleLowerCase():
      return 'maxLength';

    case 'maxWords'.toLocaleLowerCase():
      return 'maxWords';

    case 'minLength'.toLocaleLowerCase():
      return 'minLength';

    case 'minWords'.toLocaleLowerCase():
      return 'minWords';

    case 'notInArray'.toLocaleLowerCase():
      return 'notInArray';

    case 'startsWith'.toLocaleLowerCase():
      return 'startsWith';

    default:
      return key.toLocaleLowerCase();
  }
}