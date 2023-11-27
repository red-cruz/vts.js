// @ts-check
import defaultMsg from '../../defaults/defaultMsg';
import VtsFormValidator from '../../utils/VtsFormValidator';
import attachEvent from '../../utils/attachEvent';
import applyDateModifier from '../../utils/validation/applyDateModifier';
import { replaceDateMsg } from '../../utils/validation/replaceMessage';

export function afterRule(rules, field, label) {
  return dateRule.call(this, 'after', rules, field, label);
}

export function afterOrEqual(rules, field, label) {
  return dateRule.call(this, 'afterOrEqual', rules, field, label);
}

export function beforeOrEqual(rules, field, label) {
  return dateRule.call(this, 'beforeOrEqual', rules, field, label);
}

export function before(rules, field, label) {
  return dateRule.call(this, 'before', rules, field, label);
}

/**
 * @param {string} ruleName
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default} Vts
 * @returns {import('../../types/base/validation').VtsValidationMessages}
 */
function dateRule(ruleName, rules, field, label) {
  const rule = rules ? rules[ruleName] : null;
  if (!rule) return {};

  let targetDate, targetField;

  if (typeof rule === 'string') {
    const _rule = getDateFromRule(ruleName, rules, field);
    if (!_rule) return {};

    targetDate = _rule.targetDate;
    targetField = _rule.targetField;
  } else {
    targetDate = rule(field, label);
  }

  const fieldDate = new Date(field.value);
  const ruleMsg = rules.message
    ? rules.message[ruleName]
    : this.message[ruleName];

  let valid = false;
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
