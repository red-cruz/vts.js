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
  const minRule = rules.min;

  if (!minRule) return {};

  let min = 0;
  let valid = false;

  /** @type {import('../../types/core/index').VtsField|undefined} */
  let targetField;

  const getErrMsg = (num = min) => {
    const errMsg = {
      min: rules.messages?.min || this.messages?.min || defaultMsg.min,
    };

    errMsg.min = errMsg.min
      .replace(/{:min}/g, String(num))
      .replace(/{:label}/g, label);

    if (targetField) {
      const targetRules = this._getFieldRules(targetField);
      errMsg.min = errMsg.min
        .replace(/{:targetValue}/g, targetField.value)
        .replace(
          /{:targetLabel}/g,
          getFieldLabel(targetRules.label, targetField, this.form)
        );
    }

    return errMsg;
  };

  try {
    /** @type {{min: number, targetField?:import('../../types/core/index').VtsField}} */
    const awaitedMin = await getMinOrMax.call(this, 'min', rules, field, label);
    min = awaitedMin.min;
    targetField = awaitedMin.targetField;

    if (field instanceof HTMLInputElement) {
      switch (field.type) {
        case 'file':
          const fileLen = field.files?.length;
          valid = fileLen === undefined ? false : fileLen >= min;
          break;

        case 'checkbox':
          return getErrMsg();

        case 'number':
          field.min = String(min);
        default:
          valid = Number(field.value) >= min;
          break;
      }
    } else if (field instanceof HTMLSelectElement) {
      valid = field.selectedOptions.length >= min;
    } else {
      valid = field.value.length >= min;
    }
  } catch (error) {
    console.error(error);
    return getErrMsg(0);
  }

  return valid ? {} : getErrMsg();
}
