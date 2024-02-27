// @ts-check
import defaultMsg from '../../defaults/defaultMsg';
import getFieldLabel from '../../utils/getFieldLabel';
import getRuleValue from '../../utils/rules/getRuleValue';

/**
 * @param {import('../../types/config/rules').Rules[string]} rules
 * @param {import('../../types/core/index').VtsField} field
 * @param {string} label
 * @this {import('../../types/core/index').default} Vts
 */
export default async function (rules, field, label) {
  if (!rules.endsWith) return {};

  /** @type {{ruleValue: string, targetField: import('../../types/core/index').VtsField|undefined}} */ // @ts-ignore
  const { ruleValue, targetField } = await getRuleValue(
    this,
    rules,
    field,
    label,
    'endsWith'
  );

  const isValid = field.value.endsWith(ruleValue);

  if (isValid) return {};

  const messages =
    rules.messages?.endsWith || this.messages?.endsWith || defaultMsg.endsWith;

  const targetLabel = targetField
    ? getFieldLabel(rules.label, targetField, this.form)
    : '';

  return {
    endsWith: messages
      .replace(/{:endsWith}/g, ruleValue)
      .replace(/{:targetValue}/g, targetField?.value ?? '')
      .replace(/{:targetLabel}/g, targetLabel),
  };
}
