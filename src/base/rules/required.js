// @ts-check
import defaultMsg from '../../defaults/defaultMsg';
import VtsFormValidator from '../../utils/VtsFormValidator';
import attachEvent from '../../utils/attachEvent';
import getFieldLabel from '../../utils/getFieldLabel';

/**
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @returns {boolean}
 */
export default function isRequiredAndInvalid(rules, field) {
  // if (
  //   field instanceof HTMLInputElement &&
  //   (field.type === 'checkbox' || field.type === 'radio')
  // ) {
  //   return (
  //     (!!rules?.required && !field.checked) ||
  //     (field.required && !field.checked)
  //   );
  // }
  return (rules?.required && !field.value) || field.validity.valueMissing;
}

/**
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default} Vts
 * @returns {import('../../types/base/validation').VtsValidationResults}
 */
export function requiredRule(rules, field, label) {
  const ruleMsg = rules?.message?.required || this.message?.required;

  if (isRequiredAndInvalid(rules, field)) {
    return {
      required: ruleMsg || defaultMsg.required,
    };
  }

  return {};
}

/**
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default} Vts
 * @returns {Promise<import('../../types/base/validation').VtsValidationResults>}
 */
export async function requiredIfRule(rules, field, label) {
  const requiredIf = rules?.requiredIf;
  const isFunction = typeof requiredIf === 'function';

  if ((!isFunction && !requiredIf) || isRequiredAndInvalid(rules, field)) {
    return {};
  }

  let isInvalid = false;

  let invalidMsg =
    rules.message?.requiredIf ||
    this.message?.requiredIf ||
    defaultMsg.requiredIf;

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
    invalidMsg = invalidMsg
      .replace(/{:targetValue}/g, requiredField.value)
      .replace(
        /{:targetLabel}/g,
        getFieldLabel(rules.label, requiredField, this.form)
      );

    attachEvent('requiredIf', requiredField, field, rules);
  }

  return isInvalid ? { requiredIf: invalidMsg } : {};
}
