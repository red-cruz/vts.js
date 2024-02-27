import VtsFormValidator from '../VtsFormValidator';
import attachEvent from '../attachEvent';

/**
 * @param {import('../../types/core/index').default} vtsInstance
 * @param {import('../../types/config/rules').Rules[string]} rules
 * @param {import('../../types/core/index').VtsField} field
 * @param {string} label
 * @param {import('../../types/config/rules').Rule<string>} ruleObj
 */
export async function getStrRuleValue(
  vtsInstance,
  rules,
  field,
  label,
  ruleObj
) {
  let ruleValue = '';

  /** @type {import('../../types/core/index').VtsField|undefined} */
  let targetField;

  const extractRuleFromStr = (rule = '') => {
    if (rule.startsWith('field:')) {
      targetField = VtsFormValidator.validateField(
        vtsInstance.form,
        rule.replace('field:', '')
      );
      attachEvent('required', targetField, field, rules);
      return targetField?.value;
    }
    return rule;
  };

  switch (typeof ruleObj) {
    case 'function':
      vtsInstance._setCheckingRule(rules, field, label);
      const required = await ruleObj(field, label);
      ruleValue = extractRuleFromStr(required);
      break;

    default:
      ruleValue = extractRuleFromStr(ruleObj);
      break;
  }

  return { ruleValue, targetField };
}

/**
 * @param {import('../../types/core/index').default} vtsInstance
 * @param {import('../../types/config/rules').Rules[string]} rules
 * @param {import('../../types/core/index').VtsField} field
 * @param {string} label
 * @param {import('../../types/config/rules').Rule<string>} ruleObj
 */
export async function getNumberRuleValue(
  vtsInstance,
  rules,
  field,
  label,
  ruleObj
) {
  let ruleValue = '';

  /** @type {import('../../types/core/index').VtsField|undefined} */
  let targetField;

  const extractRuleFromStr = (rule = '') => {
    if (rule.startsWith('field:')) {
      targetField = VtsFormValidator.validateField(
        vtsInstance.form,
        rule.replace('field:', '')
      );
      attachEvent('required', targetField, field, rules);
      return targetField?.value;
    }
    return rule;
  };

  switch (typeof ruleObj) {
    case 'function':
      vtsInstance._setCheckingRule(rules, field, label);
      const required = await ruleObj(field, label);
      ruleValue = extractRuleFromStr(required);
      break;

    default:
      ruleValue = extractRuleFromStr(ruleObj);
      break;
  }

  return { ruleValue, targetField };
}
