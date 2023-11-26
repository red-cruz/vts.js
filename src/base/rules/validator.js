// @ts-check

/**
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/base/index').default} Vts
 * @returns {Promise<import('../../types/base/validation').VtsValidationMessages>}
 */
export default async function validatorRule(rules, field, label) {
  const customValidator = rules?.validator;
  if (!customValidator) return {};

  if (typeof customValidator === 'function') {
    this._setCheckingRule(rules, field, label);
    const invalidMsg = await customValidator(field, label);
    return invalidMsg ? { validator: invalidMsg } : {};
  } else {
    const invalidMsgs = {
      validator: [],
    };
    for (const validator of customValidator) {
      const invalidMsg = await validator(field, label);
      // @ts-ignore
      if (invalidMsg) invalidMsgs.validator.push(invalidMsg);
    }
    return invalidMsgs;
  }
}
