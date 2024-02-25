// @ts-check
import Vts from '../../Vts';
import defaultMsg from '../../defaults/defaultMsg';
import getFieldLabel from '../../utils/getFieldLabel';
import getMinOrMax from '../../utils/rules/getMinOrMax';
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

  const checkedItems = group
    .map((gField) => gField instanceof HTMLInputElement && gField.checked)
    .filter(Boolean).length;

  const invalidMsgObj = {};

  /** @type {boolean} */
  const required = await isFieldRequired.call(this, rules, field, label);

  /** @type {import('../../types/core').VtsField} */
  let targetField;
  let isValid = true;
  let min = 0;
  let max = 0;

  /** @param {"required"|"max"|"min"} key */
  const setErrMsg = (key) => {
    const rMessages = rules.messages ? rules.messages[key] : '';
    const tMessages = this.messages ? this.messages[key] : '';
    /** @type {string} */
    const errMsg = rMessages || tMessages || defaultMsg[key];

    invalidMsgObj[key] = errMsg
      .replace(/{:min}/g, String(min))
      .replace(/{:max}/g, String(max))
      .replace(/{:required}/g, String(required))
      .replace(/{:label}/g, label);

    if (targetField) {
      const targetRules = this._getFieldRules(targetField);
      invalidMsgObj[key] = errMsg
        .replace(/{:targetValue}/g, targetField.value)
        .replace(
          /{:targetLabel}/g,
          getFieldLabel(targetRules.label, targetField, this.form)
        );
    }
    isValid = false;

    return true;
  };

  const renderValidState = () => {
    group.forEach((gField) => {
      gField.required = false;
      gField.setCustomValidity('');
    });
    this.renderFeedback.call(lastField, validMessage, renderClass);
  };

  const renderInvalidState = () => {
    group.forEach((gField) => {
      gField.required = true;
      gField.setCustomValidity(Object.keys(invalidMsgObj).join(','));
    });
    this.renderFeedback.call(lastField, invalidMsgObj, renderClass);
  };

  // VALIDATE REQUIRED RULE
  if (!checkedItems) {
    if (required) {
      // return if field is required and there is no checked items
      return setErrMsg('required') && renderInvalidState();
    } else {
      // return if field is not required and there is no checked items
      return renderValidState();
    }
  }

  // VALIDATE MIN RULE
  /** @type {{min: number, targetField?:import('../../types/core/index').VtsField}} */
  const awaitedMin = await getMinOrMax.call(this, 'min', rules, field, label);
  min = awaitedMin.min;
  if (awaitedMin.targetField) targetField = awaitedMin.targetField;

  if (min && checkedItems < min) {
    setErrMsg('min');
    return renderInvalidState();
  } else {
    isValid = true;
  }

  /** @type {{max: number, targetField?:import('../../types/core/index').VtsField}} */
  const awaitedMax = await getMinOrMax.call(this, 'max', rules, field, label);
  max = awaitedMax.max;
  if (awaitedMax.targetField) targetField = awaitedMax.targetField;
  console.log(max);
  if (max && checkedItems > max) {
    setErrMsg('max');
    return renderInvalidState();
  } else {
    isValid = true;
  }

  return isValid ? renderValidState() : renderInvalidState();
}
