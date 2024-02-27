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
  if (!rules.pattern) return {};

  /** @type {{ruleValue: RegExp, targetField: import('../../types/core/index').VtsField|undefined}} */ // @ts-ignore
  const { ruleValue, targetField } = await getRuleValue(
    this,
    rules,
    field,
    label,
    'pattern'
  );

  const isValid = ruleValue.test(field.value);

  if (isValid) return {};

  const messages =
    rules.messages?.pattern || this.messages?.pattern || defaultMsg.pattern;

  const targetLabel = targetField
    ? getFieldLabel(rules.label, targetField, this.form)
    : '';

  return {
    pattern: messages
      .replace(/{:pattern}/g, ruleValue.source)
      .replace(/{:targetValue}/g, targetField?.value ?? '')
      .replace(/{:targetLabel}/g, targetLabel),
  };
}
