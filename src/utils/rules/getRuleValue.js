// @ts-check
import VtsFormValidator from '../VtsFormValidator';
import attachEvent from '../attachEvent';

/**
 * @param {import('../../types/core/index').default} vtsInstance
 * @param {import('../../types/config/rules').Rules[string]} rules
 * @param {import('../../types/core/index').VtsField} field
 * @param {string} label
 * @param {string} ruleKey
 */
export async function getStrRuleValue(
  vtsInstance,
  rules,
  field,
  label,
  ruleKey
) {
  let ruleValue = '';
  /** @type {import('../../types/config/rules').Rule<string>} */
  let stringRule = rules[ruleKey];

  /** @type {import('../../types/core/index').VtsField|undefined} */
  let targetField;

  const extractRule = (rule = '') => {
    if (rule.startsWith('field:')) {
      targetField = VtsFormValidator.validateField(
        vtsInstance.form,
        rule.replace('field:', '')
      );
      attachEvent(ruleKey, targetField, field, rules);
      return targetField?.value;
    }
    return rule;
  };

  switch (typeof stringRule) {
    case 'function':
      vtsInstance._setCheckingRule(rules, field, label);
      const required = await stringRule(field, label);
      ruleValue = extractRule(required);
      break;

    default:
      ruleValue = extractRule(stringRule);
      break;
  }

  return { ruleValue, targetField };
}

/**
 * @param {import('../../types/core/index').default} vtsInstance
 * @param {import('../../types/config/rules').Rules[string]} rules
 * @param {import('../../types/core/index').VtsField} field
 * @param {string} label
 * @param {import('../../types/config/rules').Rule<string|number>} numberRule
 */
export async function getNumberRuleValue(
  vtsInstance,
  rules,
  field,
  label,
  numberRule
) {
  let ruleValue = 1;

  /** @type {import('../../types/core/index').VtsField|undefined} */
  let targetField;

  // const extractRule = (rule = '') => {
  //   if (rule.startsWith('field:')) {
  //     targetField = VtsFormValidator.validateField(
  //       vtsInstance.form,
  //       rule.replace('field:', '')
  //     );
  //     attachEvent('required', targetField, field, rules);
  //     return targetField?.value;
  //   }
  //   return rule;
  // };

  switch (typeof numberRule) {
    case 'function':
      vtsInstance._setCheckingRule(rules, field, label);
      const required = await stringRule(field, label);
      ruleValue = extractRule(required);
      break;

    default:
      ruleValue = extractRule(stringRule);
      break;
  }

  return { ruleValue, targetField };
}
