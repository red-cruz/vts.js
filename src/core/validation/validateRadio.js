// @ts-check

import Vts from '../../Vts';
import defaultMsg from '../../defaults/defaultMsg';
import getFieldLabel from '../../utils/getFieldLabel';
import { isFieldRequired } from '../rules/required';

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

  /** @type {boolean} */
  const required = await isFieldRequired.call(this, rules, field, label);

  if (required && !isValid) {
    const invalidMsg = {
      required:
        rules.messages?.required ||
        this.messages?.required ||
        defaultMsg.required,
    };

    invalidMsg.required = invalidMsg.required
      .replace(/{:required}/g, String(required))
      .replace(/{:label}/g, label);

    this.renderFeedback.call(lastField, invalidMsg, renderClass);
  } else {
    this.renderFeedback.call(lastField, validMessage, renderClass);
  }
}
