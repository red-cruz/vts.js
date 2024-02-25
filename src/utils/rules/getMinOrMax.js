// @ts-check

import VtsFormValidator from '../VtsFormValidator';
import attachEvent from '../attachEvent';

/**
 * @param {"min"|"max"} key
 * @param {import('../../types/config/rules').Rules[string]} rules
 * @param {import('../../types/core/index').VtsField} field
 * @param {string} label
 * @this {import('../../types/core/index').default} Vts
 * @returns {Promise<{min?: number, max?:number, targetField?:import('../../types/core/index').VtsField}>}
 */
export default async function (key, rules, field, label) {
  const rule = rules[key];
  let minOrMax = 0;

  if (!rule) return { [key]: minOrMax };

  try {
    switch (typeof rule) {
      case 'function':
        this._setCheckingRule(rules, field, label);
        const minRuleX = await rule(field, label);

        if (typeof minRuleX === 'string') {
          if (minRuleX.startsWith('field:')) {
            const targetField = VtsFormValidator.validateField(
              this.form,
              minRuleX.replace('field:', '')
            );
            attachEvent(key, targetField, field, rules);
            return { [key]: Number(targetField.value), targetField };
          } else {
            minOrMax = Number(minRuleX);
          }
        } else {
          minOrMax = minRuleX;
        }
        break;

      case 'number':
        minOrMax = rule;
        break;

      default:
        let minSrc = rule;
        if (rule.startsWith('field:')) {
          const targetField = VtsFormValidator.validateField(
            this.form,
            rule.replace('field:', '')
          );
          attachEvent(key, targetField, field, rules);
          minSrc = targetField.value;
        } else minSrc = rule;

        minOrMax = Number(minSrc);
    }
  } catch (error) {
    minOrMax = 0;
    console.error(error);
  }

  return { [key]: minOrMax };
}
