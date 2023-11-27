// @ts-check
import defaultMsg from '../../defaults/defaultMsg';
import VtsFormValidator from '../../utils/VtsFormValidator';
import attachEvent from '../../utils/attachEvent';
import applyDateModifier from '../../utils/validation/applyDateModifier';
import { replaceDateMsg } from '../../utils/validation/replaceMessage';

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
 * @returns {Promise<import('../../types/base/validation').VtsValidationMessages>}
 */
async function dateRule(ruleName, rules, field, label) {
  const rule = rules ? rules[ruleName] : null;
  if (!rule) return {};

  let targetDate, targetField;

  if (typeof rule === 'string') {
    const ruleDates = getDateFromRule(ruleName, rules, field);
    if (!ruleDates) return {};

    targetDate = ruleDates.targetDate;
    targetField = ruleDates.targetField;
  } else {
    // rule is function
    targetDate = await rule(field, label);
  }

  let valid = false;
  const fieldDate = new Date(field.value);
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

  const ruleMsg = rules.message
    ? rules.message[ruleName]
    : this.message[ruleName];
  const message = valid ? '' : ruleMsg || defaultMsg[ruleName];

  return { [ruleName]: replaceDateMsg(message, targetField, targetDate) };
}

function getDateFromRule(form, rule, rules, field) {
  const targetField = VtsFormValidator.validateField(this.form, rules[rule]);

  if (!targetField) {
    console.warn(
      `The element with name "${rule}" is not a valid field element. 
          Please ensure you are passing the name of a valid field in the form.`
    );
    return targetField;
  }

  attachEvent(rule, targetField, field, rules);

  const targetDate = new Date(targetField.value);
  applyDateModifier(rules[rule], targetDate);

  return {
    targetField,
    targetDate,
  };
}
