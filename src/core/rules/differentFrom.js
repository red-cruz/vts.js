// @ts-check
import defaultMsg from '../../defaults/defaultMsg';
import VtsFormValidator from '../../utils/VtsFormValidator';
import attachEvent from '../../utils/attachEvent';
import getFieldLabel from '../../utils/getFieldLabel';

/**
 * @param {import('../../types/config/rules').Rules[string]} rules
 * @param {import('../../types/core/index').VtsField} field
 * @param {string} label
 * @this {import('../../types/core/index').default} Vts
 */
export default async function (rules, field, label) {
  const differentFrom = rules.differentFrom;
  if (!differentFrom) return {};

  let matchValue = '';

  /** @type {import('../../types/core/index').VtsField|undefined} */
  let targetField;

  /** @param {string} rule */
  const extractRuleFromStr = (rule) => {
    if (rule.startsWith('field:')) {
      targetField = VtsFormValidator.validateField(
        this.form,
        rule.replace('field:', '')
      );
      attachEvent('required', targetField, field, rules);
      return targetField?.value;
    }
    return rule;
  };

  switch (typeof differentFrom) {
    case 'function':
      this._setCheckingRule(rules, field, label);
      const required = await differentFrom(field, label);
      matchValue = extractRuleFromStr(required);
      break;

    default:
      matchValue = extractRuleFromStr(differentFrom);
      break;
  }

  const isValid = field.value !== matchValue;

  if (isValid) return {};

  const messages =
    rules.messages?.differentFrom ||
    this.messages?.differentFrom ||
    defaultMsg.differentFrom;

  const targetLabel = targetField
    ? getFieldLabel(rules.label, targetField, this.form)
    : '';

  return {
    differentFrom: messages
      .replace(/{:differentFrom}/g, matchValue)
      .replace(/{:targetValue}/g, targetField?.value ?? '')
      .replace(/{:targetLabel}/g, targetLabel),
  };
}
