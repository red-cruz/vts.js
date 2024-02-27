// @ts-check
import startsWith from '../../core/rules/startsWith';
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
  /** @type {string|number|Date} */
  let ruleValue;

  /** @type {import('../../types/core/index').VtsField|undefined} */
  let targetField;

  /** @param {string|number|Date} rule */
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
          const date = new Date(ruleValue);
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
          // ruleValue = new RegExp(rule);
          break;

        case 'required':
          // ruleValue = value !== 'false' ?? field.required;
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

// /**
//  * @param {import('../../types/core/index').default} vtsInstance
//  * @param {import('../../types/config/rules').Rules[string]} rules
//  * @param {import('../../types/core/index').VtsField} field
//  * @param {string} label
//  * @param {import('../../types/config/rules').RuleKeys} ruleKey
//  */
// export async function getStrRuleValue(
//   vtsInstance,
//   rules,
//   field,
//   label,
//   ruleKey
// ) {
//   let ruleValue = '';

//   /** @type {import('../../types/config/rules').Rule<string>} */
//   let stringRule = ruleValue;

//   /** @type {import('../../types/core/index').VtsField|undefined} */
//   let targetField;

//   const extractRule = (rule = '') => {
//     if (rule.startsWith('field:')) {
//       targetField = VtsFormValidator.validateField(
//         vtsInstance.form,
//         rule.replace('field:', '')
//       );
//       attachEvent(ruleKey, targetField, field, rules);
//       return targetField?.value;
//     }
//     return rule;
//   };

//   switch (typeof stringRule) {
//     case 'function':
//       vtsInstance._setCheckingRule(rules, field, label);
//       const required = await stringRule(field, label);
//       ruleValue = extractRule(required);
//       break;

//     default:
//       ruleValue = extractRule(stringRule);
//       break;
//   }

//   return { ruleValue, targetField };
// }
