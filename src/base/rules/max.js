// @ts-check
import defaultMsg from '../../defaults/defaultMsg';

/**
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default} Vts
 * @returns {import('../../types/base/validation').VtsValidationResults}
 */
export default function maxRule(rules, field, label) {
  const max = rules?.max || Number(field.dataset.vtsRuleMax);
  if (!max) return {};

  const message = rules?.message?.max || this.message?.max || defaultMsg.max;

  let valid = false;

  if (field instanceof HTMLInputElement) {
    switch (field.type) {
      case 'number':
        valid = Number(field.value) <= max;
        break;

      case 'file':
        const fileLen = field.files?.length;
        valid = fileLen === undefined ? false : fileLen <= max;
        break;

      default:
        valid = field.value.length <= max;
        break;
    }
  } else if (field instanceof HTMLSelectElement) {
    valid = field.selectedOptions.length <= max;
  } else {
    valid = field.value.length <= max;
  }

  return valid
    ? {}
    : {
        max: message.replace(/{:max}/g, String(max)),
      };
}
