// @ts-check

import VtsFormValidator from '../../utils/VtsFormValidator';
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
  let matchValue = '';

  if (!matchingField) {
    console.warn(
      `The element with name "${equalTo}" is not a valid field element. 
          Please ensure you are passing the name of a valid field in the form.`
    );
    return '';
  }

  // get value of target field
  matchValue = matchingField.value;
  // overwrite pattern
  const pattern = rules.flags?.includes('g')
    ? matchValue + '\\b'
    : `^${matchValue}$`;
  const regex = new RegExp(pattern, rules.flags);

  const message = regex.test(field.value)
    ? ''
    : rules.message?.invalid || this.message.invalid || `Invalid ${label}`;

  return message
    ?.replace(/:{targetValue}/g, matchValue)
    .replace(/:{targetLabel}/g, getFieldLabel(matchingField, this.form));
}
