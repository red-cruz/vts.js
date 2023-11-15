// @ts-check
import VtsFormValidator from '../../utils/VtsFormValidator';
import attachEvent from '../../utils/attachEvent';
import getEventType from '../../utils/getEventType';

/**
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default} Vts
 * @returns {string}
 */
export default function requiredIfRule(rules, field, label) {
  const requiredIf = rules.requiredIf;
  const isFunction = typeof requiredIf === 'function';
  if (!isFunction && !requiredIf) return '';

  if (isFunction) {
    field.required = requiredIf(field, label);
  } else {
    const requiredField = VtsFormValidator.validateField(this.form, requiredIf);
    if (!requiredField) {
      console.warn(
        `The element with name "${requiredIf}" is not a valid field element. 
            Please ensure you are passing the name of a valid field in the form.`
      );
      return '';
    }

    attachEvent('requiredIf', requiredField, field, rules, (event) => {
      field.required = !!requiredField.value;
      field.dispatchEvent(
        new Event(getEventType(field.type, rules?.eventType))
      );
    });
  }

  const invalidMsg =
    rules.message?.valueMissing ||
    this.message.valueMissing ||
    field.validationMessage;

  return !field.required || (field.required && field.checkValidity())
    ? ''
    : invalidMsg;
}
