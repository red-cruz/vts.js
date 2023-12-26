// @ts-check
import Vts from '../Vts';
import defaultMsg from '../defaults/defaultMsg';
import attachEvent from '../utils/attachEvent';
import getFieldLabel from '../utils/getFieldLabel';
import { registeredRules } from './Rules';

/** @type {import('../types/base/validation').default} */
const vtsValidation = {
  _data: {
    validFields: new Map(),
    invalidFields: new Map(),
  },
  async _validate(field) {
    // refactor, validate fields based on their type!!!
    const rules = this._getFieldRules(field);
    const label = getFieldLabel(rules?.label, field, this.form);

    /** @type {import('../types/base/validation').VtsValidationMessages} */
    let validationMessages = await getValidationMessages.call(
      this,
      rules,
      field,
      label
    );

    const setAsValid = (vField = field, vRule = rules) => {
      vField.setCustomValidity('');
      validationMessages.valid =
        vRule?.message?.valid ?? this.message.valid ?? defaultMsg.valid;

      this._data.invalidFields.delete(vField.name);
      this._data.validFields.set(vField.name, {
        field: vField,
        messages: validationMessages,
        label,
      });
    };

    const setAsInvalid = (vField = field) => {
      const errorValidationMsg = Object.values(validationMessages).join(', ');
      vField.setCustomValidity(errorValidationMsg);
      this._data.validFields.delete(vField.name);
      this._data.invalidFields.set(vField.name, {
        field: vField,
        messages: validationMessages,
        label,
      });
    };

    const isValid = Object.keys(validationMessages).length;
    // set custom validity
    if (isValid) {
      // INVALID
      setAsInvalid();
    } else {
      // VALID
      setAsValid();
    }

    if (
      field instanceof HTMLInputElement &&
      (field.type === 'checkbox' || field.type === 'radio')
    ) {
      let fieldIdx = 0;
      const fieldName = field.getAttribute('name') || field.name;
      const group = Vts.getGroupedFields(this.fields, fieldName);
      const hasGroup = group.find((gField, index) => {
        const match = gField === field;
        if (match) fieldIdx = index;
        return match;
      });

      if (hasGroup) {
        group.splice(fieldIdx, 1);
        for (const gField of group) {
          const gRules = this._getFieldRules(gField);
          if (isValid) {
            gField.setCustomValidity('');
            validationMessages.valid =
              gRules?.message?.valid ?? this.message.valid ?? defaultMsg.valid;

            this._data.invalidFields.delete(gField.name);
            this._data.validFields.set(gField.name, {
              field: gField,
              messages: validationMessages,
              label: getFieldLabel(gRules?.label, gField, this.form),
            });
          } else {
            const errorValidationMsg =
              Object.values(validationMessages).join(', ');
            gField.setCustomValidity(errorValidationMsg);
            this._data.validFields.delete(gField.name);
            this._data.invalidFields.set(gField.name, {
              field: gField,
              messages: validationMessages,
              label: getFieldLabel(gRules?.label, gField, this.form),
            });
          }
        }
      }
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

    handlers.valid(valid, validData, form, this.fields);
    handlers.invalid(invalid, invalidData, form, this.fields);
  },
};

/**
 * @param {import('../types/config/rules').VtsRules[string]|undefined} rules
 * @param {HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../types/base').default}
 * @returns {Promise<import('../types/base/validation').VtsValidationMessages>}
 */
async function getValidationMessages(rules, field, label) {
  let validationMessages = {};

  // TODO: if field is not required, no need to execute validation rules if there is no value
  for (const rule of registeredRules) {
    /** @type {import('../types/base/validation').VtsValidationMessages} */
    const validationMessage = await rule.call(this, rules, field, label);
    const key = Object.keys(validationMessage)[0];

    if (key) {
      const message = validationMessage[key];
      const value = field.value;
      if (typeof message === 'string') {
        const val = value || label;
        validationMessage[key] = message
          .replace(/{:value}/g, value || label)
          .replace(/{:label}/g, label)
          .replace(/{:length}/g, String(value.length));
      } else {
        // array
        for (const subKey in message) {
          validationMessage[key][subKey] = message[subKey]
            .replace(/{:value}/g, value || label)
            .replace(/{:label}/g, label)
            .replace(/{:length}/g, String(value.length));
        }
      }
    }

    validationMessages = Object.assign(validationMessages, validationMessage);

    // if the field is invalid and has required rule, break the loop to prevent other rules from executing
    const isRequired =
      (rule.name === 'required' || rule.name === 'requiredIf') &&
      (validationMessages.required || validationMessages.requiredIf);
    if (isRequired) {
      break;
    }
  }

  return validationMessages;
}

export default vtsValidation;
