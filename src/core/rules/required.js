// @ts-check
import defaultMsg from '../../defaults/defaultMsg';
import getFieldLabel from '../../utils/getFieldLabel';
import getRuleValue from '../../utils/rules/getRuleValue';

/**
 * @param {import('../../types/config/rules').Rules[string]} rules
 * @param {import('../../types/core/index').VtsField} field
 * @param {string} label
 * @param {null|boolean} [isValid=null]
 * @this {import('../../types/core/index').default} Vts
 * @returns {Promise<import('../../types/core/validation').ValidationResults>}
 */
export async function requiredRule(rules, field, label, isValid = null) {
  /** @type {{ruleValue: boolean, targetField?:import('../../types/core/index').VtsField}} */ //@ts-ignore
  const { ruleValue, targetField } = await getRuleValue(
    this,
    rules,
    field,
    label,
    'required'
  );

  const valid = isValid ?? (ruleValue && !!field.value);

  field.required = ruleValue;

  if (!ruleValue || valid) return {};

  const messages =
    rules.messages?.required || this.messages?.required || defaultMsg.required;

  const targetLabel = targetField
    ? getFieldLabel(rules.label, targetField, this.form)
    : '';

  return {
    required: messages
      .replace(/{:required}/g, String(ruleValue))
      .replace(/{:targetValue}/g, targetField?.value ?? '')
      .replace(/{:targetLabel}/g, targetLabel),
  };
}
