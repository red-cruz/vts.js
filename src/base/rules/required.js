// @ts-check
import defaultMsg from '../../defaults/defaultMsg';
import VtsFormValidator from '../../utils/VtsFormValidator';
import attachEvent from '../../utils/attachEvent';

/**
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default} Vts
 * @returns {Promise<import('../../types/base/validation').VtsValidationMessages>}
 */
export default async function requiredIfRule(rules, field, label) {
  const requiredIf = rules?.requiredIf;
  const isFunction = typeof requiredIf === 'function';
  if (!isFunction && !requiredIf) return {};

  let isInvalid = false;

  const invalidMsg =
    rules.message?.valueMissing ||
    this.message?.valueMissing ||
    defaultMsg.valueMissing;

  if (isFunction) {
    this._setCheckingRule(rules, field, label);
    isInvalid = await requiredIf(field, label);
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

/**
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default} Vts
 * @returns {import('../../types/base/validation').VtsValidationMessages}
 */
export function required(rules, field, label) {
  const required = rules?.required;
  if (!required) return {};

  if (!field.value) {
    return {
      required:
        rules.message?.valueMissing ||
        this.message?.valueMissing ||
        defaultMsg.valueMissing,
    };
  } else return {};
}
