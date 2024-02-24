// @ts-check

import Vts from '../../Vts';
import defaultMsg from '../../defaults/defaultMsg';

/**
 * @param {HTMLInputElement} field
 * @param {import('../../types/config/rules').Rules[string]} rules
 * @param {{valid:string}} validMessage
 * @param {{}} renderClass
 * @this {import('../../types/core').default}
 */
export default async function (field, rules, validMessage, renderClass) {
  const group = Vts.getGroupedFields(field);
  const lastField = group[group.length - 1];
  const isValid = group.some((field) => field.checkValidity());

  if (isValid) {
    this.renderFeedback.call(lastField, validMessage, renderClass);
  } else {
    this.renderFeedback.call(
      lastField,
      {
        required:
          rules.messages?.required ??
          this.messages?.required ??
          defaultMsg.required,
      },
      renderClass
    );
  }
}
