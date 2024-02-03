// @ts-check
import defaultMsg from '../../defaults/defaultMsg';

/**
 * @param {import('../../types/config/rules').Rules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/core/index').default} Vts
 * @returns {import('../../types/core/validation').ValidationResults}
 */
export default function minRule(rules, field, label) {
  const min = rules.min || Number(field.dataset.vtsRuleMin);
  if (!min) return {};

  const messages = rules.messages?.min || this.messages?.min || defaultMsg.min;

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
        min: messages.replace(/{:min}/g, String(min)),
      };
}
