// @ts-check
import defaultMsg from '../../defaults/defaultMsg';
import getFieldLabel from '../../utils/getFieldLabel';
import getMinOrMax from '../../utils/rules/getMinOrMax';

/**
 * @param {import('../../types/config/rules').Rules[string]} rules
 * @param {import('../../types/core/index').VtsField} field
 * @param {string} label
 * @this {import('../../types/core/index').default} Vts
 * @returns {Promise<import('../../types/core/validation').ValidationResults>}
 */
export default async function (rules, field, label) {
  const minRule = rules.max;

  if (!minRule) return {};

  let max = 0;
  let valid = false;

  /** @type {import('../../types/core/index').VtsField|undefined} */
  let targetField;

  const getErrMsg = (num = max) => {
    const errMsg = {
      max: rules.messages?.max || this.messages?.max || defaultMsg.max,
    };

    errMsg.max = errMsg.max
      .replace(/{:max}/g, String(num))
      .replace(/{:label}/g, label);

    if (targetField) {
      const targetRules = this._getFieldRules(targetField);
      errMsg.max = errMsg.max
        .replace(/{:targetValue}/g, targetField.value)
        .replace(
          /{:targetLabel}/g,
          getFieldLabel(targetRules.label, targetField, this.form)
        );
    }

    return errMsg;
  };

  try {
    /** @type {{max: number, targetField?:import('../../types/core/index').VtsField}} */
    const awaitedMin = await getMinOrMax.call(this, 'max', rules, field, label);
    max = awaitedMin.max;
    targetField = awaitedMin.targetField;

    if (field instanceof HTMLInputElement) {
      switch (field.type) {
        case 'file':
          const fileLen = field.files?.length;
          valid = fileLen === undefined ? false : fileLen <= max;
          break;

        case 'checkbox':
          return getErrMsg();

        case 'number':
          field.max = String(max);
        default:
          valid = Number(field.value) <= max;
          break;
      }
    } else if (field instanceof HTMLSelectElement) {
      valid = field.selectedOptions.length <= max;
    } else {
      valid = field.value.length <= max;
    }
  } catch (error) {
    console.error(error);
    return getErrMsg(0);
  }

  return valid ? {} : getErrMsg();
}
