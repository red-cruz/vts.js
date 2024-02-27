// @ts-check
import defaultMsg from '../../defaults/defaultMsg';
import getFieldLabel from '../../utils/getFieldLabel';
import getStrRuleValue from '../../utils/rules/getStrRuleValue';

/**
 * @param {import('../../types/config/rules').Rules[string]} rules
 * @param {import('../../types/core/index').VtsField} field
 * @param {string} label
 * @this {import('../../types/core/index').default} Vts
 */
export default async function (rules, field, label) {
  const endsWithRule = rules.endsWith;

  if (!endsWithRule) return {};

  const { ruleValue, targetField } = await getStrRuleValue(
    this,
    rules,
    field,
    label,
    endsWithRule
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
