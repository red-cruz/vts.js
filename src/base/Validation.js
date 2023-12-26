// @ts-check
import Vts from '../Vts';
import defaultMsg from '../defaults/defaultMsg';
import attachEvent from '../utils/attachEvent';
import getFieldLabel from '../utils/getFieldLabel';
import { registeredRules } from './Rules';

/** @type {import('../types/base/validation').default} */
const vtsValidation = {
  async _validate(field) {
    if (field.type === 'checkbox') {
      // validate cbox
    } else if (field.type === 'radio') {
      // validate cbox
    } else {
      // inputs.push(field);
    }

    const rules = this._getFieldRules(field);
    const label = getFieldLabel(rules?.label, field, this.form);

    /** @type {import('../types/base/validation').VtsValidationMessages} */
    let invalidMessages = await getValidationMessages.call(
      this,
      rules,
      field,
      label
    );
    const isValid = Object.keys(invalidMessages).length;
    // set custom validity
    if (isValid) {
      // INVALID
      const errorValidationMsg = Object.values(invalidMessages).join(', ');
      field.setCustomValidity(errorValidationMsg);
      this.handler.call(field, invalidMessages, this.class.invalid);
    } else {
      // VALID
      field.setCustomValidity('');
      const validMessage = {
        valid: rules?.message?.valid ?? this.message.valid ?? defaultMsg.valid,
      };
      this.handler.call(field, validMessage, this.class.valid);
    }
    console.log(isValid);

    // if (
    //   field instanceof HTMLInputElement &&
    //   (field.type === 'checkbox' || field.type === 'radio')
    // ) {
    //   let fieldIdx = 0;
    //   const fieldName = field.getAttribute('name') || field.name;
    //   const group = Vts.getGroupedFields(this.fields, fieldName);
    //   const hasGroup = group.find((gField, index) => {
    //     const match = gField === field;
    //     if (match) fieldIdx = index;
    //     return match;
    //   });

    //   if (hasGroup) {
    //     group.splice(fieldIdx, 1);
    //     for (const gField of group) {
    //       const gRules = this._getFieldRules(gField);
    //       if (isValid) {
    //         gField.setCustomValidity('');
    //         invalidMessages.valid =
    //           gRules?.message?.valid ?? this.message.valid ?? defaultMsg.valid;

    //         this._data.invalidFields.delete(gField.name);
    //         this._data.validFields.set(gField.name, {
    //           field: gField,
    //           messages: invalidMessages,
    //           label: getFieldLabel(gRules?.label, gField, this.form),
    //         });
    //       } else {
    //         const errorValidationMsg =
    //           Object.values(invalidMessages).join(', ');
    //         gField.setCustomValidity(errorValidationMsg);
    //         this._data.validFields.delete(gField.name);
    //         this._data.invalidFields.set(gField.name, {
    //           field: gField,
    //           messages: invalidMessages,
    //           label: getFieldLabel(gRules?.label, gField, this.form),
    //         });
    //       }
    //     }
    //   }
    // }

    // this._reportValidity();
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
  let invalidMessages = {};

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

    invalidMessages = Object.assign(invalidMessages, validationMessage);

    // if the field is invalid and has required rule, break the loop to prevent other rules from executing
    const isRequired =
      (rule.name === 'required' || rule.name === 'requiredIf') &&
      (invalidMessages.required || invalidMessages.requiredIf);
    if (isRequired) {
      break;
    }
  }

  return invalidMessages;
}

async function validateCheckbox(field) {}

async function validateRadioButton(field) {}

export default vtsValidation;
