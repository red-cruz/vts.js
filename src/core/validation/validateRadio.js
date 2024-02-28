// @ts-check

import Vts from '../../Vts';
import defaultMsg from '../../defaults/defaultMsg';
import getFieldLabel from '../../utils/getFieldLabel';
import getRuleValue from '../../utils/rules/getRuleValue';

/**
 * @param {HTMLInputElement} field
 * @param {import('../../types/config/rules').Rules[string]} rules
 * @param {{valid:string}} validMessage
 * @param {{}} renderClass
 * @this {import('../../types/core').default}
 */
export default async function (field, rules, validMessage, renderClass) {
  const group = Vts.getGroupedFields(field);
  const label = getFieldLabel(rules.label, field, this.form);
  const lastField = group[group.length - 1];
  const isValid = group.some((field) => field.checkValidity());

  /** @type {{ruleValue: boolean, targetField?:import('../../types/core').VtsField}} */ //@ts-ignore
  const { ruleValue, targetField } = await getRuleValue(
    this,
    rules,
    lastField,
    label,
    'required'
  );

  const required = ruleValue;

  group.forEach((gField) => (gField.required = required));

  if (required && !isValid) {
    const invalidMsg = {
      required:
        rules.messages?.required ||
        this.messages?.required ||
        defaultMsg.required,
    };

    invalidMsg.required = invalidMsg.required
      .replace(/{:required}/g, String(required))
      .replace(/{:value}/g, field.value)
      .replace(/{:label}/g, label);

    if (targetField) {
      const targetLabel = getFieldLabel(rules.label, targetField, this.form);
      invalidMsg.required = invalidMsg.required
        .replace(/{:targetLabel}/g, targetLabel)
        .replace(/{:targetValue}/g, targetField.value);
    }

    this.renderFeedback.call(field, invalidMsg, renderClass);
  } else {
    // remove checking state
    group.forEach((gField) => gField.setCustomValidity(''));

    this.renderFeedback.call(field, validMessage, renderClass);
  }
}
