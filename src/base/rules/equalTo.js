// @ts-check
import VtsFormValidator from '../../utils/VtsFormValidator';
import attachEvent from '../../utils/attachEvent';
import getFieldLabel from '../../utils/getFieldLabel';

/**
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default} Vts
 * @returns {string}
 */
export default function equalToRule(rules, field, label) {
  const equalTo = rules.equalTo;
  if (!equalTo) return '';

  let matchingField = VtsFormValidator.validateField(this.form, equalTo);

  if (!matchingField) {
    console.warn(
      `The element with name "${equalTo}" is not a valid field element. 
          Please ensure you are passing the name of a valid field in the form.`
    );
    return '';
  }

  attachEvent('equalTo', matchingField, field, rules);

  // get value of target field
  const matchValue = matchingField.value;
  const regex = new RegExp(`^${matchValue}$`);

  const message = regex.test(field.value)
    ? ''
    : rules.message?.invalid || this.message.invalid || `Invalid ${label}`;

  return message
    ?.replace(/:{targetValue}/g, matchValue)
    .replace(/:{targetLabel}/g, getFieldLabel(matchingField, this.form));
}
