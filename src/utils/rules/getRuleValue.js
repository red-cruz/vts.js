// @ts-check
import VtsFormValidator from '../VtsFormValidator';
import attachEvent from '../attachEvent';

/**
 * @param {import('../../types/core').default} vtsInstance
 * @param {import('../../types/config/rules').Rules[string]} rules
 * @param {import('../../types/core').VtsField} field
 * @param {string} label
 * @param {import('../../types/config/rules').RuleKey} ruleKey
 */
export default async function (vtsInstance, rules, field, label, ruleKey) {
  /** @type {string|number|Date|RegExp|boolean|string[]} */
  let ruleValue;

  /** @type {import('../../types/core').VtsField|undefined} */
  let targetField;

  /** @param {string|number|Date|RegExp|boolean|string[]} rule */
  const extractWithBoundFn = (rule) => {
    ruleValue = rule;
    const isBound = typeof rule === 'string' && rule.startsWith('field:');
    // get value of bound field
    if (isBound) {
      targetField = VtsFormValidator.validateField(
        vtsInstance.form,
        rule.replace('field:', '')
      );
      attachEvent(ruleKey, targetField, field, rules);
      ruleValue = targetField.value;
    }

    return extractRule(ruleValue, ruleKey);
  };

  /** @type {import('../../types/config/rules').Rule<string|number|Date|string[]>} */
  const rule = rules[ruleKey];

  switch (typeof rule) {
    case 'function':
      vtsInstance._setCheckingRule(rules, field, label);
      const _rule = await rule(field, label);
      ruleValue = extractWithBoundFn(_rule);

      break;

    default:
      ruleValue = extractWithBoundFn(rule);
      break;
  }

  return { ruleValue, targetField };
}

/**
 * extract rules except for functions and bound fields
 *
 * @param {string|number|Date|RegExp|boolean|string[]} rule
 * @param {import('../../types/config/rules').RuleKey} ruleKey
 */
export function extractRule(rule, ruleKey) {
  let ruleValue = rule;
  const isBound = typeof rule === 'string' && rule.startsWith('field:');

  try {
    switch (ruleKey) {
      case 'after':
      case 'afterOrEqual':
      case 'before':
      case 'beforeOrEqual':
        if (
          ruleValue instanceof RegExp ||
          ruleValue instanceof Array ||
          typeof ruleValue === 'boolean'
        )
          break;

        const date =
          ruleValue instanceof Date ? ruleValue : new Date(ruleValue);
        date.setHours(23, 59, 59, 999);

        ruleValue = date;
        break;

      case 'max':
      case 'min':
      case 'size':
        ruleValue = Number(ruleValue);
        break;

      case 'pattern':
        if (!(ruleValue instanceof RegExp) || typeof ruleValue !== 'string')
          break;

        try {
          ruleValue = new RegExp(ruleValue);
        } catch (error) {
          ruleValue = /.*/;
        }
        break;

      case 'required':
        if (typeof ruleValue === 'string')
          ruleValue = isBound ? !!ruleValue : ruleValue !== 'false';
        break;

      case 'inArray':
      case 'notInArray':
        if (typeof ruleValue !== 'string') break;

        try {
          const obj = JSON.parse(ruleValue);
          ruleValue = Object.values(obj);
        } catch (error) {
          if (typeof ruleValue === 'string')
            ruleValue = ruleValue.split(',').map((val) => val.trim());
        }

        break;
    }
  } catch (error) {
    console.error(error);
  }

  return ruleValue;
}
