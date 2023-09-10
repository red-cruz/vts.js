import getFieldLabel from '../utils/getFieldLabel';

/** @type {import('../types/validation').VtsValidation} */
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
    const field_name = field.getAttribute('name');
    if (field.validity.valid) {
      this._data.invalidFields.delete(field_name);
      this._data.validFields.set(field_name, data);
    } else {
      this._data.validFields.delete(field_name);
      this._data.invalidFields.set(field_name, data);
    }
  },
  _validate(field, label) {
    let message = field.validationMessage;
    const rules = this._getFieldRules(field.getAttribute('name'));
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
