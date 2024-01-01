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
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default} Vts
 * @returns {Promise<import('../../types/base/validation').VtsValidationResults>}
 */
async function dateRule(ruleName, rules, field, label) {
  const rule = (rules ? rules[ruleName] : null) || field.dataset.vtsRuleDate;
  if (!rule) return {};

  let targetDate, targetField, dateModifier;

  if (typeof rule === 'string') {
    const ruleDates = getDateFromRule(this.form, ruleName, rules, field);
    if (!ruleDates) return {};

    targetDate = new Date(ruleDates.targetDate.toDateString());
    targetField = ruleDates.targetField;
    dateModifier = ruleDates.dateModifier;
  } else {
    // rule is function
    const awaited = await rule(field, label);
    targetDate = new Date(awaited.toDateString());
  }

  let valid = false;
  const fieldDate = new Date(new Date(field.value).toDateString());
  switch (ruleName) {
    case 'after':
      valid = fieldDate > targetDate;
      break;
    case 'afterOrEqual':
      valid = fieldDate >= targetDate;
      break;
    case 'before':
      valid = fieldDate < targetDate;
      break;
    case 'beforeOrEqual':
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

function getDateFromRule(form, rule, rules, field) {
  const targetField = VtsFormValidator.validateField(form, rules[rule]);

  if (!targetField) {
    console.warn(
      `The element with name "${rule}" is not a valid field element. 
          Please ensure you are passing the name of a valid field in the form.`
    );
    return targetField;
  }

  attachEvent(rule, targetField, field, rules);

  const targetDate = new Date(targetField.value);
  const dateModifier = applyDateModifier(rules[rule], targetDate);

  return {
    dateModifier,
    targetField,
    targetDate,
  };
}

/**
 * @param {string} ruleName
 * @param {Date|Promise<Date>} targetDate
 * @param {string} dateModifier
 * @this {import('../../types/base/index').default} Vts
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

  const ruleMsg = rules.message
    ? rules.message[ruleName]
    : this.message[ruleName];

  const message = (ruleMsg || defaultMsg[ruleName])
    .replace(/{:targetValue}/g, dateStr)
    .replace(/{:targetLabel}/g, targetLabel)
    .replace(/{:offset}/g, dateModifier);

  return message;
}
