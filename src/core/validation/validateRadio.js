// @ts-check

import Vts from '../../Vts';
import defaultMsg from '../../defaults/defaultMsg';
import getFieldLabel from '../../utils/getFieldLabel';
import { requiredRule } from '../rules/required';

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

  /** @type {Promise<import('../../types/core/validation').ValidationResults>} */
  const msg = await requiredRule.call(this, field, rules, label, isValid);

  console.log(msg);

  this.renderFeedback.call(lastField, msg, renderClass);
  // return
  // /** @type {{ruleValue: boolean, targetField?:import('../../types/core/index').VtsField}} */ //@ts-ignore
  // const { ruleValue, targetField } = await getRuleValue(
  //   this,
  //   rules,
  //   field,
  //   label,
  //   'required'
  // );

  // const required = ruleValue;

  // if (required && !isValid) {
  //   const invalidMsg = {
  //     required:
  //       rules.messages?.required ||
  //       this.messages?.required ||
  //       defaultMsg.required,
  //   };

  //   invalidMsg.required = invalidMsg.required
  //     .replace(/{:required}/g, String(required))
  //     .replace(/{:label}/g, label);

  //   this.renderFeedback.call(lastField, invalidMsg, renderClass);
  // } else {
  //   this.renderFeedback.call(lastField, validMessage, renderClass);
  // }
}
