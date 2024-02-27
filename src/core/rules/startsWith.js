// @ts-check
import defaultMsg from '../../defaults/defaultMsg';
import getFieldLabel from '../../utils/getFieldLabel';
import { getStrRuleValue } from '../../utils/rules/getRuleValue';

/**
 * @param {import('../../types/config/rules').Rules[string]} rules
 * @param {import('../../types/core/index').VtsField} field
 * @param {string} label
 * @this {import('../../types/core/index').default} Vts
 */
export default async function (rules, field, label) {
  if (!rules.startsWith) return {};

  const { ruleValue, targetField } = await getStrRuleValue(
    this,
    rules,
    field,
    label,
    'startsWith'
  );

  const isValid = field.value.startsWith(ruleValue);

  if (isValid) return {};

  const messages =
    rules.messages?.startsWith ||
    this.messages?.startsWith ||
    defaultMsg.startsWith;

  const targetLabel = targetField
    ? getFieldLabel(rules.label, targetField, this.form)
    : '';

  return {
    startsWith: messages
      .replace(/{:startsWith}/g, ruleValue)
      .replace(/{:targetValue}/g, targetField?.value ?? '')
      .replace(/{:targetLabel}/g, targetLabel),
  };
}
