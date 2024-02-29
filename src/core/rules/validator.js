// @ts-check

/**
 * @param {import('../../types/config/rules').Rules[string]} rules
 * @param {import('../../types/core').VtsField} field
 * @param {string} label
 * @this {import('../../types/core').default} Vts
 * @returns {Promise<import('../../types/core/validation').ValidationResults>}
 */
export default async function validatorRule(rules, field, label) {
  const customValidator = rules.validator;
  if (!customValidator) return {};

  if (typeof customValidator === 'function') {
    this._setCheckingRule(rules, field, label);
    const invalidMsg = await customValidator(field, label);

    return invalidMsg ? { validator: invalidMsg } : {};
  } else {
    // customValidator is array

    const invalidMsgs = {
      validator: [],
    };

    for (const validator of customValidator) {
      this._setCheckingRule(rules, field, label);
      const invalidMsg = await validator(field, label);
      // @ts-ignore
      if (invalidMsg) invalidMsgs.validator.push(invalidMsg);
    }

    return invalidMsgs;
  }
}
