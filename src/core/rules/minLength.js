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
  if (!rules.minLength) return {};

  /** @type {{ruleValue: number, targetField: import('../../types/core').VtsField|undefined}} */ // @ts-ignore
  const { ruleValue, targetField } = await getRuleValue(
    this,
    rules,
    field,
    label,
    'minLength'
  );
  console.log(ruleValue);

  let isValid = field.value.length >= ruleValue;

  if (!(field instanceof HTMLSelectElement)) {
    field.minLength = ruleValue;
  }

  if (isValid) return {};

  const messages =
    rules.messages?.minLength ||
    this.messages?.minLength ||
    defaultMsg.minLength;

  const targetLabel = targetField
    ? getFieldLabel(rules.label, targetField, this.form)
    : '';

  return {
    minLength: messages
      .replace(/{:minLength}/g, String(ruleValue))
      .replace(/{:targetValue}/g, targetField?.value ?? '')
      .replace(/{:targetLabel}/g, targetLabel),
  };
}
