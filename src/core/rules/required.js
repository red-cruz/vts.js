// @ts-check
import defaultMsg from '../../defaults/defaultMsg';
import VtsFormValidator from '../../utils/VtsFormValidator';
import attachEvent from '../../utils/attachEvent';

/**
 * @this {import('../../types/core/index').default}
 * @param {import('../../types/config/rules').Rules[string]} rules
 * @param {import('../../types/core/index').VtsField} field
 * @param {string} label
 */
export async function isFieldRequired(rules, field, label) {
  /** @type {import('../../types/config/rules').Rule<string | boolean> } */ //@ts-ignore
  const requiredRule = rules.required;

  let isRequired = true;

  /** @param {string|boolean} rule */
  const extractRuleFromStr = (rule) => {
    if (typeof rule === 'string') {
      if (rule.startsWith('field:')) {
        const targetField = VtsFormValidator.validateField(
          this.form,
          rule.replace('field:', '')
        );
        attachEvent('required', targetField, field, rules);
        return !!targetField?.value;
      }
      return rule === 'true';
    } else {
      return rule;
    }
  };

  switch (typeof requiredRule) {
    case 'function':
      this._setCheckingRule(rules, field, label);
      const required = await requiredRule(field, label);
      isRequired = extractRuleFromStr(required);
      break;

    case 'boolean':
      isRequired = requiredRule;
      break;

    default:
      isRequired = extractRuleFromStr(requiredRule);
      break;
  }

  field.required = isRequired;

  return isRequired;
}

/**
 * @param {import('../../types/config/rules').Rules[string]} rules
 * @param {import('../../types/core/index').VtsField} field
 * @param {string} label
 * @this {import('../../types/core/index').default} Vts
 * @returns {Promise<import('../../types/core/validation').ValidationResults>}
 */
export async function requiredRule(rules, field, label) {
  const ruleMsg =
    rules.messages?.required || this.messages?.required || defaultMsg.required;
  const required = await isFieldRequired.call(this, rules, field, label);

  if (required && !field.value) {
    return {
      required: ruleMsg,
    };
  }

  return {};
}
