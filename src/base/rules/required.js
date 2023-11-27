// @ts-check
import defaultMsg from '../../defaults/defaultMsg';
import VtsFormValidator from '../../utils/VtsFormValidator';
import attachEvent from '../../utils/attachEvent';

/**
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @returns {boolean}
 */
export default function isRequiredAndInvalid(rules, field) {
  return (rules?.required && !field.value) || field.validity.valueMissing;
}

/**
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default} Vts
 * @returns {import('../../types/base/validation').VtsValidationMessages}
 */
export function requiredRule(rules, field, label) {
  const ruleMsg = rules?.message?.requiredIf || this.message?.requiredIf;

  if (isRequiredAndInvalid(rules, field)) {
    return {
      required: ruleMsg || defaultMsg.valueMissing,
    };
  }

  return {};
}

/**
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default} Vts
 * @returns {Promise<import('../../types/base/validation').VtsValidationMessages>}
 */
export async function requiredIfRule(rules, field, label) {
  const requiredIf = rules?.requiredIf;
  const isFunction = typeof requiredIf === 'function';

  if ((!isFunction && !requiredIf) || isRequiredAndInvalid(rules, field)) {
    return {};
  }

  let isInvalid = false;

  const invalidMsg =
    rules.message?.required ||
    this.message?.requiredIf ||
    defaultMsg.valueMissing;

  if (isFunction) {
    this._setCheckingRule(rules, field, label);
    isInvalid = await requiredIf(field, label, this.form);
  } else {
    const requiredField = VtsFormValidator.validateField(this.form, requiredIf);
    if (!requiredField) {
      console.warn(
        `The element with name "${requiredIf}" is not a valid field element. 
            Please ensure you are passing the name of a valid field in the form.`
      );
      return {};
    }

    isInvalid = !!requiredField.value && !field.value;

    attachEvent('requiredIf', requiredField, field, rules);
  }

  return isInvalid ? { requiredIf: invalidMsg } : {};
}
