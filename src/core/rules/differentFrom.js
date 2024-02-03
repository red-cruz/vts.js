// @ts-check
import defaultMsg from '../../defaults/defaultMsg';
import VtsFormValidator from '../../utils/VtsFormValidator';
import attachEvent from '../../utils/attachEvent';
import getFieldLabel from '../../utils/getFieldLabel';

/**
 * @param {import('../../types/config/rules').Rules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/core/index').default} Vts
 * @returns {import('../../types/core/validation').ValidationResults}
 */
export default function differentFrom(rules, field, label) {
  const differentFrom =
    rules.differentFrom || field.dataset['vts-rule-differentFrom'];
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

  const messages =
    field.value !== matchValue
      ? ''
      : rules.messages?.differentFrom ||
        this.messages?.differentFrom ||
        defaultMsg.differentFrom;

  const targetLabel = getFieldLabel(rules.label, targetField, this.form);
  return {
    differentFrom: messages
      ?.replace(/{:targetValue}/g, matchValue || targetLabel)
      .replace(/{:targetLabel}/g, targetLabel),
  };
}
