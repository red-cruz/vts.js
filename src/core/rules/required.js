// @ts-check
import defaultMsg from '../../defaults/defaultMsg';
import VtsFormValidator from '../../utils/VtsFormValidator';
import attachEvent from '../../utils/attachEvent';
import getFieldLabel from '../../utils/getFieldLabel';
import getRuleValue from '../../utils/rules/getRuleValue';

/**
 * @param {import('../../types/config/rules').Rules[string]} rules
 * @param {import('../../types/core').VtsField} field
 * @param {string} label
 * @this {import('../../types/core').default} Vts
 * @returns {Promise<import('../../types/core/validation').ValidationResults>}
 */
export async function requiredRule(rules, field, label) {
  /** @type {{ruleValue: boolean, targetField?:import('../../types/core').VtsField}} */ //@ts-ignore
  const { ruleValue, targetField } = await getRuleValue(
    this,
    rules,
    field,
    label,
    'required'
  );

  const valid = ruleValue && !!field.value;

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
