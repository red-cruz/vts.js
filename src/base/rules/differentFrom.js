// @ts-check
import defaultMsg from '../../defaults/defaultMsg';
import VtsFormValidator from '../../utils/VtsFormValidator';
import attachEvent from '../../utils/attachEvent';
import getFieldLabel from '../../utils/getFieldLabel';

/**
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default} Vts
 * @returns {import('../../types/base/validation').VtsValidationMessages}
 */
export default function differentFrom(rules, field, label) {
  const differentFrom = rules?.differentFrom;
  if (!differentFrom) return {};

  let targetField = VtsFormValidator.validateField(this.form, differentFrom);

  if (!targetField) {
    console.warn(
      `The element with name "${differentFrom}" is not a valid field element. 
          Please ensure you are passing the name of a valid field in the form.`
    );
    return {};
  }

  attachEvent('differentFrom', targetField, field, rules);

  // get value of target field
  const matchValue = targetField.value;

  const message =
    field.value !== matchValue
      ? ''
      : rules.message?.differentFrom ||
        this.message.differentFrom ||
        defaultMsg.differentFrom;

  const targetLabel = getFieldLabel(rules.label, targetField, this.form);
  return {
    differentFrom: message
      ?.replace(/{:targetValue}/g, matchValue || targetLabel)
      .replace(/{:targetLabel}/g, targetLabel),
  };
}