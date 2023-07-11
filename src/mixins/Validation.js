// @ts-check
import getFieldLabel from '../utils/getFieldLabel';
import { vtsDefaults } from '../utils/Defaults';

const vtsValidation = {
  _data: {
    validFields: new Map(),
    invalidFields: new Map(),
  },
  /**
   * @description Validates each field. triggered by form submit event
   * @memberof Vts
   */
  _validate() {
    for (const field of this.fields) {
      this._checkFieldValidity(field);
    }

    this._reportValidity();
  },

  /**
   * @description
   * @author RED
   * @param {HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement} field
   * @memberof Vts
   */
  _checkFieldValidity(field) {
    // this.#log.show('log', 'validating field:', field);
    this._clearValidity(field);
    /** @type {import('../types/rules').VtsRules[string]} */
    const rules = this._getFieldRules(field.name);
    let fieldData = {
      field: field,
      label: getFieldLabel(field, this.form),
      message: '',
    };

    let valid = field.checkValidity();

    fieldData.message = this._getValidityStateMessage(field, rules?.message);

    // prevent rules from being applied if default html constraints exists
    if (rules && valid) {
      [valid, fieldData] = this._applyRules(rules, field.value, fieldData);
    }

    fieldData.message = fieldData.message
      ?.replace(/\${value}/g, field.value)
      .replace(/\${label}/g, fieldData.label);

    this._setValidity(valid, field, fieldData);
  },

  /**
   * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
   * @param {import('../types/rules').VtsRuleMessage}  [validityStateMsg={}]
   * @returns {string}
   */
  _getValidityStateMessage(field, validityStateMsg = {}) {
    let message = field.validationMessage;
    const validity = field.validity;
    const invalid = !validity.valid;
    for (const key in validity) {
      if (validity[key]) {
        message =
          validityStateMsg[key] || vtsDefaults.ruleMessage[key] || message;
        console.log(key, message);
      }
    }

    return message;
  },
  _reportValidity() {
    const data = this._data;
    const validData = Object.fromEntries(data.validFields);
    const invalidData = Object.fromEntries(data.invalidFields);
    const form = this.form;
    const fnValid = this.config.fnValid;
    const fnInvalid = this.config.fnInvalid;
    fnValid(validData, form);
    fnInvalid(invalidData, form);
  },
  _setValidity(valid, field, data) {
    if (valid) {
      this._clearValidity(field);
      this._data.invalidFields.delete(field.name);
      this._data.validFields.set(field.name, data);
    } else {
      field.setCustomValidity(data.message);
      this._data.validFields.delete(field.name);
      this._data.invalidFields.set(field.name, data);
    }
  },
  _clearValidity(field) {
    field.setCustomValidity('');
  },
};

export default vtsValidation;
