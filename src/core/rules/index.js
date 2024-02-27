// @ts-check
import defaultMsg from '../../defaults/defaultMsg';
import {
  afterOrEqualRule,
  afterRule,
  beforeRule,
  beforeOrEqualRule,
} from './date';
import notEqualTo from './notEqualTo';
import endsWithRule from './endsWith';
import equalToRule from './equalTo';
import inArrayRule from './inArray';
import maxRule from './max';
import minRule from './min';
import notInArrayRule from './notInArray';
import patternRule from './pattern';
import sizeRule from './size';
import startsWithRule from './startsWith';
import validatorRule from './validator';

const inputRules = [
  afterRule,
  afterOrEqualRule,
  beforeRule,
  beforeOrEqualRule,
  endsWithRule,
  notEqualTo,
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

/** @type {import('../../types/core/rules').default} */
const vtsRules = {
  _getFieldRules(field) {
    const rule = field.dataset.vtsRule || field.name;
    return this.rules.get(rule) || {};
  },

  _convertRulesToMap() {
    /** @type {Map<string,import('../../types/config/rules').Rules[string]>} */
    const rulesMap = new Map();

    /** @type {import('../../types/config/rules').Rules[string]} */
    const rules = this.rules;

    // map field constraints
    this.fields.forEach((field) => {
      const ruleName = field.dataset.vtsRule || field.name;
      const definedRules = rules[ruleName] || {};

      // get default rules from field dataset
      let rulesFromDataset = Object.entries(field.dataset)
        .filter(([key]) => key.startsWith('vtsRule') && key !== 'vtsRule')
        .reduce(
          /** @param {import('../../types/config/rules').Rules[string]} rules */
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
                  case 'maxLength':
                  case 'maxWords':
                  case 'min':
                  case 'minLength':
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
export { inputRules };

/**
 * @param {string} [rule]
 * @returns {string|undefined|import('../../types/config/rules').RuleFunction<any>}
 */
function extractRule(rule) {
  if (rule)
    return rule.startsWith('window.')
      ? window[rule.replace('window.', '')]
      : rule;
}

/**
 * @param {string} key
 * @returns {import('../../types/config/rules').RuleKeys}
 */
function parseRuleKey(key) {
  switch (key.toLocaleLowerCase()) {
    case 'afterOrEqual'.toLocaleLowerCase():
      return 'afterOrEqual';

    case 'beforeOrEqual'.toLocaleLowerCase():
      return 'beforeOrEqual';

    case 'notEqualTo'.toLocaleLowerCase():
      return 'notEqualTo';

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
      // @ts-ignore
      return key.toLocaleLowerCase();
  }
}
