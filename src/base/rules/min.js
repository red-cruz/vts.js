// @ts-check
import defaultMsg from '../../defaults/defaultMsg';

/**
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default} Vts
 * @returns {import('../../types/base/validation').VtsValidationResults}
 */
export default function minRule(rules, field, label) {
  const min = rules?.min;
  if (!min) return {};

  const message = rules.message?.min || this.message.min || defaultMsg.min;

  let valid = false;

  if (field instanceof HTMLInputElement) {
    switch (field.type) {
      case 'number':
        valid = Number(field.value) >= min;
        break;

      case 'file':
        const fileLen = field.files?.length;
        valid = fileLen === undefined ? false : fileLen >= min;
        break;

      default:
        valid = field.value.length >= min;
        break;
    }
  } else if (field instanceof HTMLSelectElement) {
    valid = field.selectedOptions.length >= min;
  } else {
    valid = field.value.length >= min;
  }

  return valid
    ? {}
    : {
        min: message.replace(/{:min}/g, String(min)),
      };
}
