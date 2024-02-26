// @ts-check
import defaultMsg from '../../defaults/defaultMsg';
import VtsFormValidator from '../../utils/VtsFormValidator';
import attachEvent from '../../utils/attachEvent';
import getFieldLabel from '../../utils/getFieldLabel';
import applyDateModifier from '../../utils/validation/applyDateModifier';

export async function afterRule(rules, field, label) {
  const msg = await dateRule.call(this, 'after', rules, field, label);
  return msg;
}

export async function afterOrEqual(rules, field, label) {
  const msg = await dateRule.call(this, 'afterOrEqual', rules, field, label);
  return msg;
}

export async function before(rules, field, label) {
  const msg = await dateRule.call(this, 'before', rules, field, label);
  return msg;
}

export async function beforeOrEqual(rules, field, label) {
  const msg = await dateRule.call(this, 'beforeOrEqual', rules, field, label);
  return msg;
}

/**
 * @param {string} ruleName
 * @param {import('../../types/config/rules').Rules[string]} rules
 * @param {import('../../types/core/index').VtsField} field
 * @param {string} label
 * @this {import('../../types/core/index').default} Vts
 * @returns {Promise<import('../../types/core/validation').ValidationResults>}
 */
async function dateRule(ruleName, rules, field, label) {
  /** @type {import('../../types/config/rules').Rule<string | Date> } */
  const rule = rules[ruleName];

  if (!rule) return {};

  let targetDate = new Date();
  let targetField = null;
  let dateModifier = null;

  switch (typeof rule) {
    case 'function':
      this._setCheckingRule(rules, field, label);
      const dateRule = await rule(field, label);
      if (typeof dateRule === 'string') {
        if (dateRule.startsWith('field:')) {
          targetField = VtsFormValidator.validateField(
            this.form,
            dateRule.replace('field:', '')
          );
          attachEvent(ruleName, targetField, field, rules);
          targetDate = new Date(new Date(targetField.value).toDateString());
        } else {
          targetDate = new Date(dateRule);
        }

        applyDateModifier(dateRule, targetDate);
      } else {
        targetDate = dateRule;
      }
      break;

    case 'string':
      if (rule.startsWith('field:')) {
        targetField = VtsFormValidator.validateField(
          this.form,
          rule.replace('field:', '')
        );
        attachEvent(ruleName, targetField, field, rules);
        targetDate = new Date(targetField.value);
      } else targetDate = new Date(rule);

      applyDateModifier(rule, targetDate);
      break;

    default:
      targetDate = rule;
  }

  let valid = false;
  const fieldDate = new Date(new Date(field.value).toDateString());
  fieldDate.setHours(23, 59, 59, 999);

  const setDateMinMax = (setMax = true, offset = 0) => {
    if (!(field instanceof HTMLInputElement) || field.type !== 'date') return;

    const afterDate = new Date(targetDate.toDateString());
    if (offset < 0) {
      afterDate.setDate(afterDate.getDate() - Math.abs(offset));
    } else {
      afterDate.setDate(afterDate.getDate() + offset);
    }

    const dateStr = afterDate.toISOString().split('T')[0];

    if (setMax) {
      field.max =
        offset != 0 ? dateStr : targetDate.toISOString().split('T')[0];
    } else {
      field.min =
        offset != 0 ? dateStr : targetDate.toISOString().split('T')[0];
    }
  };

  switch (ruleName) {
    case 'after':
      setDateMinMax(false, 2);
      const afterDate = new Date(targetDate.toDateString());
      afterDate.setDate(afterDate.getDate() + 1);
      valid = fieldDate > afterDate;
      break;
    case 'afterOrEqual':
      setDateMinMax(false);
      valid = fieldDate >= targetDate;
      break;
    case 'before':
      setDateMinMax();
      valid = fieldDate < targetDate;
      break;
    case 'beforeOrEqual':
      setDateMinMax(true, -2);
      valid = fieldDate <= targetDate;
      break;
  }

  return valid
    ? {}
    : {
        [ruleName]: replaceDateMsg.call(
          this,
          ruleName,
          rules,
          targetField,
          targetDate,
          dateModifier
        ),
      };
}

/**
 * @param {string} ruleName
 * @param {import('../../types/config/rules').Rules} rules
 * @param {import('../../types/core/index').VtsField} targetField
 * @param {Date|Promise<Date>} targetDate
 * @param {string} dateModifier
 * @this {import('../../types/core/index').default} Vts
 * @return {string}
 */
export function replaceDateMsg(
  ruleName,
  rules,
  targetField,
  targetDate,
  dateModifier = ''
) {
  const isDate = targetDate instanceof Date && !isNaN(targetDate.valueOf());

  const targetLabel = targetField
    ? getFieldLabel(rules[ruleName].label, targetField, this.form)
    : '';
  const specified = targetLabel || 'the specified date';
  const dateStr = isDate ? targetDate.toLocaleString() : specified;

  const ruleMsg = rules.messages
    ? rules.messages[ruleName]
    : this.messages[ruleName];

  const messages = (ruleMsg || defaultMsg[ruleName])
    .replace(/{:targetValue}/g, dateStr)
    .replace(/{:targetLabel}/g, targetLabel)
    .replace(/{:offset}/g, dateModifier);

  return messages;
}
