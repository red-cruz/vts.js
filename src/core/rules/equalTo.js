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
  if (!rules.equalTo) return {};

  /** @type {{ruleValue: string, targetField: import('../../types/core').VtsField|undefined}} */ // @ts-ignore
  const { ruleValue, targetField } = await getRuleValue(
    this,
    rules,
    field,
    label,
    'equalTo'
  );

  const isValid = field.value === ruleValue;

  if (isValid) return {};

  const messages =
    rules.messages?.equalTo || this.messages?.equalTo || defaultMsg.equalTo;

  const targetLabel = targetField
    ? getFieldLabel(rules.label, targetField, this.form)
    : '';

  return {
    equalTo: messages
      .replace(/{:equalTo}/g, ruleValue)
      .replace(/{:targetValue}/g, targetField?.value ?? '')
      .replace(/{:targetLabel}/g, targetLabel),
  };
}
