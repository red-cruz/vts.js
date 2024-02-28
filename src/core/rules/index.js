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
import { extractRule } from '../../utils/rules/getRuleValue';

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

    let rulesFromDataset;

    // map field constraints
    this.fields.forEach((field) => {
      const ruleName = field.dataset.vtsRule || field.name;
      const definedRules = rules[ruleName] || {};

      // get default rules from field dataset
      rulesFromDataset = Object.entries(field.dataset)
        .filter(([key]) => key.startsWith('vtsRule') && key !== 'vtsRule')
        .reduce(
          /** @param {import('../../types/config/rules').Rules[string]} rules */
          (rules, [key, value]) => {
            const rKey = key.slice('vtsRule'.length);
            const ruleKey = parseRuleKey(rKey);

            // parse
            let extractedRule = extractRuleFromDataset(value);

            if (typeof extractedRule === 'string' && ruleKey === 'required') {
              // set default value for required rule
              extractedRule = String(value !== 'false' ?? field.required);
            }

            if (extractedRule instanceof Function) {
              rules[ruleKey] = extractedRule;
            } else {
              rules[ruleKey] = extractRule(extractedRule, ruleKey);
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
          maxLength: field.maxLength < 1 ? undefined : field.maxLength,
          minLength: field.minLength < 1 ? undefined : field.minLength,
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
    });

    this.rules = rulesMap;

    function mergeToDatasetRules(obj) {
      rulesFromDataset = Object.assign(obj, rulesFromDataset);
    }
  },

  _setFieldAttributes() {
    this.fields.forEach((field) => {
      const rules = this._getFieldRules(field);

      for (const ruleKey in rules) {
        /** @type {import('../../types/config/rules').Rule<string|number|RegExp|Date|Boolean>} */
        const rule = rules[ruleKey];

        if (typeof rule === 'function') continue;
        if (typeof rule === 'string' && rule.startsWith('field:')) continue;
        field.name === 'inspection_date' && console.log(rules);

        switch (ruleKey) {
          case 'after':
          case 'afterOrEqual':
            if (!(field instanceof HTMLInputElement)) break;
            if (field.type !== 'date') break;
            if (rule instanceof Date) {
              field.min = rule.toISOString().split('T')[0];
            }
            break;
          case 'before':
          case 'beforeOrEqual':
            if (!(field instanceof HTMLInputElement)) break;
            if (field.type !== 'date') break;
            if (rule instanceof Date) {
              field.max = rule.toISOString().split('T')[0];
            }
            break;
          case 'max':
            if (!(field instanceof HTMLInputElement)) break;
            if (field.type !== 'number') break;
            if (typeof rule === 'number') {
              field.max = String(rule);
            }
            break;
          case 'min':
            if (!(field instanceof HTMLInputElement)) break;
            if (field.type !== 'number') break;
            if (typeof rule === 'number') {
              field.min = String(rule);
            }
            break;
          case 'size':
            if (!(field instanceof HTMLInputElement)) break;
            if (field.type !== 'number') break;
            if (typeof rule === 'number') {
              field.min = String(rule);
              field.max = String(rule);
            }
            break;
          case 'required':
            if (typeof rule === 'boolean') field.required = rule;
            break;
        }
      }
    });
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
 * @param {string} rule
 * @returns {string|import('../../types/config/rules').RuleFunction<any>}
 */
function extractRuleFromDataset(rule = '') {
  return rule.startsWith('window.')
    ? window[rule.replace('window.', '')]
    : rule;
}

/**
 * @param {string} key
 * @returns {import('../../types/config/rules').RuleKey}
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

    case 'minLength'.toLocaleLowerCase():
      return 'minLength';

    case 'notInArray'.toLocaleLowerCase():
      return 'notInArray';

    case 'startsWith'.toLocaleLowerCase():
      return 'startsWith';

    default:
      // @ts-ignore
      return key.toLocaleLowerCase();
  }
}
