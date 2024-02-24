// @ts-check
import Vts from '../../Vts';
import defaultMsg from '../../defaults/defaultMsg';
import getFieldLabel from '../../utils/getFieldLabel';

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

  const checkedItems = group
    .map((gField) => gField instanceof HTMLInputElement && gField.checked)
    .filter(Boolean).length;

  const invalidMsgObj = {};

  let isValid = true;

  const minRule = rules.min;
  switch (typeof minRule) {
    case 'function':
      break;

    default:
      break;
  }

  const min = rules.min;

  if (rules.required)
    if (min && checkedItems < min) {
      isValid = false;
      invalidMsgObj.min = (
        rules.messages?.min ??
        this.messages?.min ??
        defaultMsg.min
      )
        .replace(/{:min}/g, String(min))
        .replace(/{:label}/g, label);
    } else {
      const hasChecked = group.some(
        (gField) => gField instanceof HTMLInputElement && gField.checked
      );

      const hasRequiredRule =
        rules.required ||
        Boolean(
          field.dataset.vtsRuleRequired !== undefined &&
            field.dataset.vtsRuleRequired != 'false'
        );

      if (hasRequiredRule && !hasChecked) {
        isValid = false;
        invalidMsgObj.required = (
          rules.messages?.required ??
          this.messages?.required ??
          defaultMsg.required
        ).replace(/{:label}/g, label);
      }
    }

  const max = rules.max || Number(field.dataset.vtsRuleMax);
  if (max && checkedItems > max) {
    isValid = false;
    invalidMsgObj.max = (
      rules.messages?.max ??
      this.messages?.max ??
      defaultMsg.max
    )
      .replace(/{:max}/g, String(max))
      .replace(/{:label}/g, label);
  }

  if (isValid) {
    group.forEach((gField) => {
      gField.required = false;
      gField.setCustomValidity('');
    });
    this.renderFeedback.call(lastField, validMessage, renderClass);
  } else {
    group.forEach((gField) => {
      gField.required = true;
      gField.setCustomValidity(Object.keys(invalidMsgObj).join(','));
    });
    this.renderFeedback.call(lastField, invalidMsgObj, renderClass);
  }
}
