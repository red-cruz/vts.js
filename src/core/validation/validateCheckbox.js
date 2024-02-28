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

  const checkedItems = group
    .map((gField) => gField instanceof HTMLInputElement && gField.checked)
    .filter(Boolean).length;

  const invalidMsgObj = {};

  /** @type {import('../../types/core').VtsField|undefined} */
  let targetField;
  let isValid = true;
  let min = 0;
  let max = 0;
  let size = 0;

  /** @type {{ruleValue: boolean, targetField?:import('../../types/core/index').VtsField}} */ //@ts-ignore
  const awaitedReq = await getRuleValue(this, rules, field, label, 'required');
  const required = awaitedReq.ruleValue;
  targetField = awaitedReq.targetField;

  /** @param {"required"|"max"|"min"|"size"} key */
  const setErrMsg = (key) => {
    const rMessages = rules.messages ? rules.messages[key] : '';
    const tMessages = this.messages ? this.messages[key] : '';
    const errMsg = rMessages || tMessages || defaultMsg[key];

    invalidMsgObj[key] = errMsg
      .replace(/{:size}/g, String(size))
      .replace(/{:length}/g, String(checkedItems))
      .replace(/{:min}/g, String(min))
      .replace(/{:max}/g, String(max))
      .replace(/{:required}/g, String(required))
      .replace(/{:label}/g, label);

    if (targetField) {
      const targetRules = this._getFieldRules(targetField);
      invalidMsgObj[key] = invalidMsgObj[key]
        .replace(/{:targetValue}/g, targetField.value)
        .replace(
          /{:targetLabel}/g,
          getFieldLabel(targetRules.label, targetField, this.form)
        );
    }

    return false;
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
      setErrMsg('required');
      // return if field is required and there is no checked items
      return renderInvalidState();
    } else {
      // return if field is not required and there is no checked items
      return renderValidState();
    }
  }

  if (rules.size) {
    // VALIDATE SIZE RULE
    /** @type {{ruleValue: number, targetField?:import('../../types/core/index').VtsField}} */ //@ts-ignore
    const awaitedSize = await getRuleValue(this, rules, field, label, 'size');
    size = awaitedSize.ruleValue;
    targetField = awaitedSize.targetField;

    if (size && checkedItems !== size) {
      isValid = setErrMsg('size');
    } else {
      isValid = true;
    }
  } else {
    if (rules.min) {
      // VALIDATE MIN RULE
      /** @type {{ruleValue: number, targetField?:import('../../types/core/index').VtsField}} */ //@ts-ignore
      const awaitedMin = await getRuleValue(this, rules, field, label, 'min');
      min = awaitedMin.ruleValue;
      targetField = awaitedMin.targetField;

      if (min && checkedItems < min) {
        isValid = setErrMsg('min');
      } else {
        isValid = true;
      }
    }

    // VALIDATE MAX RULE
    if (rules.max) {
      /** @type {{ruleValue: number, targetField?:import('../../types/core/index').VtsField}} */ //@ts-ignore
      const awaitedMax = await getRuleValue(this, rules, field, label, 'max');
      max = awaitedMax.ruleValue;
      targetField = awaitedMax.targetField;

      if (max && checkedItems > max) {
        isValid = setErrMsg('max');
      } else {
        isValid = isValid && true;
      }
    }
  }

  isValid ? renderValidState() : renderInvalidState();
}
