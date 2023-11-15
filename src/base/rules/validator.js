// @ts-check
import getFieldLabel from '../../utils/getFieldLabel';

/**
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default}
 * @returns {Promise<string>}
 */
export default async function validatorRule(rules, field, label) {
  const customValidator = rules.validator;
  if (customValidator) {
    const label = getFieldLabel(field, this.form); // @ts-ignored
    const loadingMsg = (rules.message?.loading || this.message.loading)
      .replace(/:{value}/g, field.value)
      .replace(/:{label}/g, label);

    field.setCustomValidity(loadingMsg);
    this._setValidityData(field, {
      field,
      label,
      message: loadingMsg,
    });
    this._reportValidity();

    return (await customValidator(field, label)) || '';
  } else return '';
}
