// @ts-check
import getFieldLabel from '../utils/getFieldLabel';

/** @type {import('../types/base/validation').default} */
const vtsValidation = {
  _data: {
    validFields: new Map(),
    invalidFields: new Map(),
  },
  _checkFieldValidity(field) {
    field.setCustomValidity('');
    const label = getFieldLabel(field, this.form);
    let fieldData = {
      field: field,
      label: label,
      message: this._validate(field, label),
    };

    this._setValidityData(field, fieldData);
  },
  _reportValidity() {
    const data = this._data;
    const validData = Object.fromEntries(data.validFields);
    const invalidData = Object.fromEntries(data.invalidFields);
    const form = this.form;
    const handlers = this.handlers;
    handlers.valid(this.class.valid, validData, form);
    handlers.invalid(this.class.invalid, invalidData, form);
  },
  _setValidityData(field, data) {
    const fieldName = field.getAttribute('name');
    if (!fieldName) return;
    if (field.validity.valid) {
      this._data.invalidFields.delete(fieldName);
      this._data.validFields.set(fieldName, data);
    } else {
      this._data.validFields.delete(fieldName);
      this._data.invalidFields.set(fieldName, data);
    }
  },
  _validate(field, label) {
    let message = field.validationMessage;
    const fieldName = field.getAttribute('name');

    if (!fieldName) return message;

    const rules = this._getFieldRules(fieldName);
    const validity = field.validity;

    for (const key in validity) {
      // default rule message object
      const messageConfig = this.message;
      // field specific rule message
      const ruleMsg = rules?.message ? rules.message[key] : null;
      const custMsg = ruleMsg ?? messageConfig[key];

      if (validity[key]) {
        if (validity.valid) {
          // set custom error if rule config exists
          if (rules) message = this._applyRules(rules, field, label);
          // else the field is valid
          else message = custMsg;
        }
        // invalid
        else message = custMsg ?? message;
        break;
      }
    }
    // replace placeholders
    message = message
      ?.replace(/\${value}/g, field.value)
      .replace(/\${label}/g, label);

    return message;
  },
};

export default vtsValidation;
