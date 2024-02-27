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
  const endsWithRule = rules.endsWith;

  if (!endsWithRule) return {};

  let endsWith = '';

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

  switch (typeof endsWithRule) {
    case 'function':
      this._setCheckingRule(rules, field, label);
      const required = await endsWithRule(field, label);
      endsWith = extractRuleFromStr(required);
      break;

    default:
      endsWith = extractRuleFromStr(endsWithRule);
      break;
  }

  const isValid = field.value.endsWith(endsWith);

  if (isValid) return {};

  const messages =
    rules.messages?.endsWith || this.messages?.endsWith || defaultMsg.endsWith;

  const targetLabel = targetField
    ? getFieldLabel(rules.label, targetField, this.form)
    : '';

  return {
    differentFrom: messages
      .replace(/{:endsWith}/g, endsWith)
      .replace(/{:targetValue}/g, targetField?.value ?? '')
      .replace(/{:targetLabel}/g, targetLabel),
  };
}
