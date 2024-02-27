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
  const notEqualTo = rules.notEqualTo;
  if (!notEqualTo) return {};

  const { ruleValue, targetField } = await getStrRuleValue(
    this,
    rules,
    field,
    label,
    notEqualTo
  );

  const isValid = field.value !== ruleValue;

  if (isValid) return {};

  const messages =
    rules.messages?.notEqualTo ||
    this.messages?.notEqualTo ||
    defaultMsg.notEqualTo;

  const targetLabel = targetField
    ? getFieldLabel(rules.label, targetField, this.form)
    : '';

  return {
    notEqualTo: messages
      .replace(/{:notEqualTo}/g, ruleValue)
      .replace(/{:targetValue}/g, targetField?.value ?? '')
      .replace(/{:targetLabel}/g, targetLabel),
  };
}
