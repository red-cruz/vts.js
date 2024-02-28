// @ts-check
import defaultMsg from '../../defaults/defaultMsg';
import getFieldLabel from '../../utils/getFieldLabel';
import getRuleValue from '../../utils/rules/getRuleValue';

/**
 * @param {import('../../types/config/rules').Rules[string]} rules
 * @param {import('../../types/core').VtsField} field
 * @param {string} label
 * @this {import('../../types/core').default} Vts
 */
export default async function (rules, field, label) {
  if (!rules.max) return {};

  /** @type {{ruleValue: number, targetField: import('../../types/core').VtsField|undefined}} */ // @ts-ignore
  const { ruleValue, targetField } = await getRuleValue(
    this,
    rules,
    field,
    label,
    'max'
  );

  let isValid = false;

  if (field instanceof HTMLInputElement) {
    switch (field.type) {
      case 'file':
        const fileLen = field.files?.length;
        isValid = fileLen === undefined ? false : fileLen <= ruleValue;
        break;

      case 'number':
        field.max = String(ruleValue);
        break;

      default:
        isValid = Number(field.value) <= ruleValue;
        break;
    }
  } else if (field instanceof HTMLSelectElement) {
    isValid = field.selectedOptions.length <= ruleValue;
  } else {
    isValid = field.value.length <= ruleValue;
  }

  if (isValid) return {};

  const messages = rules.messages?.max || this.messages?.max || defaultMsg.max;

  const targetLabel = targetField
    ? getFieldLabel(rules.label, targetField, this.form)
    : '';

  return {
    max: messages
      .replace(/{:max}/g, String(ruleValue))
      .replace(/{:targetValue}/g, targetField?.value ?? '')
      .replace(/{:targetLabel}/g, targetLabel),
  };
}
