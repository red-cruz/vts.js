// @ts-check
import VtsFormValidator from '../VtsFormValidator';
import attachEvent from '../attachEvent';

/**
 * @param {import('../../types/core/index').default} vtsInstance
 * @param {import('../../types/config/rules').Rules[string]} rules
 * @param {import('../../types/core/index').VtsField} field
 * @param {string} label
 * @param {import('../../types/config/rules').RuleKeys} ruleKey
 */
export default async function (vtsInstance, rules, field, label, ruleKey) {
  /** @type {string|number|Date|RegExp|boolean} */
  let ruleValue;

  /** @type {import('../../types/core/index').VtsField|undefined} */
  let targetField;

  /** @param {string|number|Date|RegExp|boolean} rule */
  const extractRule = (rule) => {
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

    try {
      switch (ruleKey) {
        case 'after':
        case 'afterOrEqual':
        case 'before':
        case 'beforeOrEqual':
          if (ruleValue instanceof RegExp || typeof ruleValue === 'boolean')
            break;

          const date =
            ruleValue instanceof Date ? ruleValue : new Date(ruleValue);
          date.setHours(23, 59, 59, 999);
          ruleValue = date;
          break;

        case 'max':
        case 'maxLength':
        case 'min':
        case 'minLength':
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
          break;
      }
    } catch (error) {
      console.error(error);
    }

    return ruleValue;
  };

  /** @type {import('../../types/config/rules').Rule<string|number|Date>} */
  const rule = rules[ruleKey];

  switch (typeof rule) {
    case 'function':
      vtsInstance._setCheckingRule(rules, field, label);
      const _rule = await rule(field, label);
      ruleValue = extractRule(_rule);

      break;

    default:
      ruleValue = extractRule(rule);
      break;
  }

  return { ruleValue, targetField };
}
