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
export default function equalToRule(rules, field, label) {
  const equalTo = rules?.equalTo;
  if (!equalTo) return {};

  let targetField = VtsFormValidator.validateField(this.form, equalTo);

  if (!targetField) {
    console.warn(
      `The element with name "${equalTo}" is not a valid field element. 
          Please ensure you are passing the name of a valid field in the form.`
    );
    return {};
  }

  attachEvent('equalTo', targetField, field, rules);

  // get value of target field
  const matchValue = targetField.value;
  const regex = new RegExp(`^${matchValue}$`);

  const message = regex.test(field.value)
    ? ''
    : rules.message?.equalTo || this.message.equalTo || defaultMsg.equalTo;

  return {
    equalTo: message
      .replace(/{:targetValue}/g, matchValue)
      .replace(
        /{:targetLabel}/g,
        getFieldLabel(rules.label, targetField, this.form)
      ),
  };
}
