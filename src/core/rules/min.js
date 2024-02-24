// @ts-check
import defaultMsg from '../../defaults/defaultMsg';
import VtsFormValidator from '../../utils/VtsFormValidator';
import attachEvent from '../../utils/attachEvent';

/**
 * @param {import('../../types/config/rules').Rules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/core/index').default} Vts
 * @returns {Promise<import('../../types/core/validation').ValidationResults>}
 */
export default async function (rules, field, label) {
  const minRule = rules.min;

  if (!minRule) return {};

  let minNumber = 0;
  let valid = false;

  const getErrMsg = (num = minNumber) => {
    const errMsg = {
      min: rules.messages?.min || this.messages?.min || defaultMsg.min,
    };

    errMsg.min = errMsg.min.replace(/{:min}/g, String(num));

    return errMsg;
  };

  try {
    switch (typeof minRule) {
      case 'function':
        this._setCheckingRule(rules, field, label);
        const min = await minRule(field, label);

        if (typeof min === 'string') {
          let minSrc = min;
          if (min.startsWith('field:')) {
            const targetField = VtsFormValidator.validateField(
              this.form,
              min.replace('field:', '')
            );
            attachEvent('min', targetField, field, rules);
            minSrc = targetField.value;
          } else minSrc = min;

          minNumber = Number(minSrc);
        } else minNumber = min;
        break;

      case 'number':
        minNumber = minRule;
        break;

      default:
        let minSrc = minRule;
        if (minRule.startsWith('field:')) {
          const targetField = VtsFormValidator.validateField(
            this.form,
            minRule.replace('field:', '')
          );
          attachEvent('min', targetField, field, rules);
          minSrc = targetField.value;
        } else minSrc = minRule;

        minNumber = Number(minSrc);
    }

    if (field instanceof HTMLInputElement) {
      switch (field.type) {
        case 'file':
          const fileLen = field.files?.length;
          valid = fileLen === undefined ? false : fileLen >= minNumber;
          break;

        case 'number':
          field.min = String(minNumber);
        default:
          valid = Number(field.value) >= minNumber;
          break;
      }
    } else if (field instanceof HTMLSelectElement) {
      valid = field.selectedOptions.length >= minNumber;
    } else {
      valid = field.value.length >= minNumber;
    }
  } catch (error) {
    console.error(error);
    return getErrMsg(0);
  }

  return valid ? {} : getErrMsg();
}
