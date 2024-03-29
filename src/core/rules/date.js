// @ts-check
import defaultMsg from '../../defaults/defaultMsg';
import getFieldLabel from '../../utils/getFieldLabel';
import getRuleValue from '../../utils/rules/getRuleValue';
import applyDateModifier from '../../utils/validation/applyDateModifier';

export async function afterRule(rules, field, label) {
  const msg = await dateRule.call(this, 'after', rules, field, label);
  return msg;
}

export async function afterOrEqualRule(rules, field, label) {
  const msg = await dateRule.call(this, 'afterOrEqual', rules, field, label);
  return msg;
}

export async function beforeRule(rules, field, label) {
  const msg = await dateRule.call(this, 'before', rules, field, label);
  return msg;
}

export async function beforeOrEqualRule(rules, field, label) {
  const msg = await dateRule.call(this, 'beforeOrEqual', rules, field, label);
  return msg;
}

/**
 * @param {import('../../types/config/rules').RuleKey} ruleName
 * @param {import('../../types/config/rules').Rules[string]} rules
 * @param {import('../../types/core').VtsField} field
 * @param {string} label
 * @this {import('../../types/core').default} Vts
 * @returns {Promise<import('../../types/core/validation').ValidationResults>}
 */
async function dateRule(ruleName, rules, field, label) {
  /** @type {import('../../types/config/rules').Rule<string | Date> } */
  const rule = rules[ruleName];

  if (!rule) return {};

  /** @type {{ruleValue: Date, targetField?:import('../../types/core').VtsField}} */ //@ts-ignore
  const awaitedRule = await getRuleValue(this, rules, field, label, ruleName);
  let targetDate = awaitedRule.ruleValue;
  let targetField = awaitedRule.targetField;

  /** @type {string?} */
  let dateModifier = '';

  /** @type {import('../../types/config/rules').Rule<string|Date|number>} */
  const dateRule = rules[ruleName];

  if (typeof dateRule === 'string') {
    dateModifier = applyDateModifier(dateRule, targetDate);
  }

  let valid = false;
  const fieldDate = new Date(new Date(field.value).toDateString());
  fieldDate.setHours(23, 59, 59, 999);

  const setDateMinMax = (setMax = true, offset = 0) => {
    if (!(field instanceof HTMLInputElement) || field.type !== 'date') return;

    const _date = new Date(targetDate.toDateString());
    if (offset > 0) {
      _date.setDate(_date.getDate() + offset);
    }

    try {
      const dateStr = _date.toISOString().split('T')[0];

      if (setMax) {
        field.max =
          offset !== 0 ? dateStr : targetDate.toISOString().split('T')[0];
      } else {
        field.min =
          offset !== 0 ? dateStr : targetDate.toISOString().split('T')[0];
      }
    } catch (error) {
      valid = false;
    }
  };

  switch (ruleName) {
    case 'after':
      const afterDate = new Date(targetDate.toDateString());
      afterDate.setDate(afterDate.getDate() + 1);
      valid = fieldDate > afterDate;
      setDateMinMax(false, 2);
      break;
    case 'afterOrEqual':
      valid = fieldDate >= targetDate;
      setDateMinMax(false);
      break;
    case 'before':
      valid = fieldDate < targetDate;
      setDateMinMax();
      break;
    case 'beforeOrEqual':
      valid = fieldDate <= targetDate;
      setDateMinMax();
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
 * @param {import('../../types/core').VtsField} targetField
 * @param {Date|Promise<Date>} targetDate
 * @param {string} dateModifier
 * @this {import('../../types/core').default} Vts
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
  const dateStr = isDate ? targetDate.toISOString().split('T')[0] : specified;

  const ruleMsg = rules.messages
    ? rules.messages[ruleName]
    : this.messages[ruleName];

  const messages = (ruleMsg || defaultMsg[ruleName])
    .replace(/{:after}/g, dateStr)
    .replace(/{:afterOrEqual}/g, dateStr)
    .replace(/{:before}/g, dateStr)
    .replace(/{:beforeOrEqual}/g, dateStr)
    .replace(/{:targetValue}/g, dateStr)
    .replace(/{:targetLabel}/g, targetLabel)
    .replace(/{:offset}/g, dateModifier);

  return messages;
}
