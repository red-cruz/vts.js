// @ts-check
import getFieldLabel from '../utils/getFieldLabel';

/** @type {import('../types/validation').VtsValidation} */
const vtsValidation = {
  _data: {
    validFields: new Map(),
    invalidFields: new Map(),
  },
  _checkFieldValidity(field) {
    console.log(field);
    field.setCustomValidity('');
    const label = getFieldLabel(field, this.form);
    let fieldData = {
      field: field,
      label: label,
      message: '',
    };
    fieldData.message = this._validate(field, label);

    console.table(fieldData, ['label', 'message']);
    this._setValidityData(field, fieldData);
  },
  _reportValidity() {
    const data = this._data;
    const validData = Object.fromEntries(data.validFields);
    const invalidData = Object.fromEntries(data.invalidFields);
    const form = this.form;
    const fnValid = this.fnValid;
    const fnInvalid = this.fnInvalid;
    fnValid(validData, form);
    fnInvalid(invalidData, form);
  },
  _setValidityData(field, data) {
    if (field.validity.valid) {
      this._data.invalidFields.delete(field.name);
      this._data.validFields.set(field.name, data);
    } else {
      this._data.validFields.delete(field.name);
      this._data.invalidFields.set(field.name, data);
    }
    console.error('naset na');
  },
  _validate(field, label) {
    let message = field.validationMessage;
    const rules = this._getFieldRules(field.name);
    const validity = field.validity;
    console.log(message, field.checkValidity());

    if (validity.customError) throw 'test';
    for (const key in validity) {
      // default rule message object
      const messageConfig = this.message;
      // field specific rule message
      const ruleMsg = rules?.message ? rules.message[key] : null;

      if (validity[key]) {
        if (validity.valid) {
          // set custom error if rule config exists
          if (rules) message = this._applyRules(rules, field, label);
          // else the field is valid
          else message = ruleMsg ?? messageConfig[key];
        }
        // invalid
        else message = ruleMsg ?? messageConfig[key] ?? message;
        break;
      }
    }
    // replace placeholders
    message = message
      ?.replace(/\${value}/g, field.value)
      .replace(/\${label}/g, label);

    console.log(`
    label: ${label}
    msg: ${message}
    `);
    return message;
  },
};

/**
 * @description Clears the validity state of a field.
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field The field to clear the validity state for.
 */
function clearValidity(field) {
  field.setCustomValidity('');
}

function replacePlaceholders(field, fieldData) {
  return fieldData;
}

export default vtsValidation;
