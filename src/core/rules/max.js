// @ts-check
import defaultMsg from '../../defaults/defaultMsg';
import VtsFormValidator from '../../utils/VtsFormValidator';
import attachEvent from '../../utils/attachEvent';

/**
 * @param {import('../../types/config/rules').Rules[string]} rules
 * @param {import('../../types/core/index').VtsField} field
 * @param {string} label
 * @this {import('../../types/core/index').default} Vts
 * @returns {Promise<import('../../types/core/validation').ValidationResults>}
 */
export default async function (rules, field, label) {
  const maxRule = rules.max;

  if (!maxRule) return {};

  let maxNumber = 0;
  let valid = false;

  const getErrMsg = (num = maxNumber) => {
    const errMsg = {
      max: rules.messages?.max || this.messages?.max || defaultMsg.max,
    };

    errMsg.max = errMsg.max.replace(/{:max}/g, String(num));

    return errMsg;
  };

  try {
    switch (typeof maxRule) {
      case 'function':
        this._setCheckingRule(rules, field, label);
        const max = await maxRule(field, label);

        if (typeof max === 'string') {
          let maxSrc = max;
          if (max.startsWith('field:')) {
            const targetField = VtsFormValidator.validateField(
              this.form,
              max.replace('field:', '')
            );
            attachEvent('max', targetField, field, rules);
            maxSrc = targetField.value;
          } else maxSrc = max;

          maxNumber = Number(maxSrc);
        } else maxNumber = max;
        break;

      case 'number':
        maxNumber = maxRule;
        break;

      default:
        let maxSrc = maxRule;
        if (maxRule.startsWith('field:')) {
          const targetField = VtsFormValidator.validateField(
            this.form,
            maxRule.replace('field:', '')
          );
          attachEvent('max', targetField, field, rules);
          maxSrc = targetField.value;
        } else maxSrc = maxRule;

        maxNumber = Number(maxSrc);
    }

    if (field instanceof HTMLInputElement) {
      switch (field.type) {
        case 'file':
          const fileLen = field.files?.length;
          valid = fileLen === undefined ? false : fileLen <= maxNumber;
          break;

        case 'number':
          field.max = String(maxNumber);
        default:
          valid = Number(field.value) <= maxNumber;
          break;
      }
    } else if (field instanceof HTMLSelectElement) {
      valid = field.selectedOptions.length <= maxNumber;
    } else {
      valid = field.value.length <= maxNumber;
    }
  } catch (error) {
    console.error(error);
    return getErrMsg(0);
  }

  return valid ? {} : getErrMsg();
}
