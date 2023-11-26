// @ts-check
import defaultMsg from '../defaults/defaultMsg';
import getFieldLabel from '../utils/getFieldLabel';
import afterRule from './rules/after';
import equalToRule from './rules/equalTo';
import patternRule from './rules/pattern';
import requiredIfRule from './rules/required';
import validatorRule from './rules/validator';

const registeredRules = [
  validatorRule,
  patternRule,
  equalToRule,
  requiredIfRule,
  afterRule,
];

/** @type {import('../types/base/validation').default} */
const vtsValidation = {
  _data: {
    validFields: new Map(),
    invalidFields: new Map(),
  },
  async _validate(field) {
    const fieldName = field.getAttribute('name') || field.name;
    const rules = this._getFieldRules(fieldName);
    const label = getFieldLabel(rules?.label, field, this.form);

    /** @type {import('../types/base/validation').VtsValidationMessages} */
    let validationMessages = await getValidationMessages.call(
      this,
      rules,
      field,
      label
    );

    // set custom validity
    if (Object.keys(validationMessages).length) {
      const errorValidationMsg = Object.values(validationMessages).join(', ');
      field.setCustomValidity(errorValidationMsg);
      this._data.validFields.delete(fieldName);
      this._data.invalidFields.set(fieldName, {
        field,
        messages: validationMessages,
        label,
      });
    } else {
      field.setCustomValidity('');
      validationMessages.valid =
        rules?.message?.valid ?? this.message.valid ?? defaultMsg.valid;

      this._data.invalidFields.delete(fieldName);
      this._data.validFields.set(fieldName, {
        field,
        messages: validationMessages,
        label,
      });
    }

    this._reportValidity();
  },
  _reportValidity() {
    const data = this._data;
    const validData = Object.fromEntries(data.validFields);
    const invalidData = Object.fromEntries(data.invalidFields);
    const form = this.form;
    const handlers = this.handlers;
    const { valid, invalid } = this.class;

    handlers.valid(valid, validData, form);
    handlers.invalid(invalid, invalidData, form);
  },
};

/**
 * @param {import('../types/config/rules').VtsRules[string]|undefined} rules
 * @param {HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement} field
 * @param {string} label
 * @returns {Promise<import('../types/base/validation').VtsValidationMessages>}
 */
async function getValidationMessages(rules, field, label) {
  let validationMessages = {};

  for (const rule of registeredRules) {
    /** @type {import('../types/base/validation').VtsValidationMessages} */
    const validationMessage = await rule.call(this, rules, field, label);
    const key = Object.keys(validationMessage)[0];

    if (key) {
      const message = validationMessage[key];
      if (typeof message === 'string') {
        validationMessage[key] = message
          .replace(/{:value}/g, field.value)
          .replace(/{:label}/g, label);
      } else {
        // array
        for (const subKey in message) {
          validationMessage[key][subKey] = message[subKey]
            .replace(/{:value}/g, field.value || 'value')
            .replace(/{:label}/g, label);
        }
      }
    }

    validationMessages = Object.assign(validationMessages, validationMessage);
  }

  return validationMessages;
}

export default vtsValidation;
