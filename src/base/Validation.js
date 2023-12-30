// @ts-check
import Vts from '../Vts';
import defaultMsg from '../defaults/defaultMsg';
import getFieldLabel from '../utils/getFieldLabel';
import { registeredRules } from './Rules';

/** @type {import('../types/base/validation').default} */
const vtsValidation = {
  async _validate(field) {
    const rules = this._getFieldRules(field);
    const label = getFieldLabel(rules?.label, field, this.form);
    const validMessage = {
      valid: rules?.message?.valid ?? this.message.valid ?? defaultMsg.valid,
    };
    const renderClass = Object.assign(this.class, { wrapper: rules?.wrapper });

    switch (field.type) {
      case 'checkbox':
        validateCheckbox.call(this, field, rules, validMessage, renderClass);
        break;

      case 'radio':
        validateRadio.call(this, field, rules, validMessage, renderClass);
        break;

      default:
        /** @type {import('../types/base/validation').VtsValidationResults} */
        let invalidMessages = await getValidationMessages.call(
          this,
          rules,
          field,
          label
        );
        const isInvalid = Object.keys(invalidMessages).length;
        // set custom validity
        if (isInvalid) {
          // INVALID
          const errorValidationMsg = Object.values(invalidMessages).join(', ');
          field.setCustomValidity(errorValidationMsg);
          this.renderFeedback.call(field, invalidMessages, renderClass);
        } else {
          // VALID
          field.setCustomValidity('');
          this.renderFeedback.call(field, validMessage, renderClass);
        }
    }
  },
};

/**
 * @param {import('../types/config/rules').VtsRules[string]|undefined} rules
 * @param {HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement} field
 * @param {string} label
 * @param {Function|null} [enforceRule=null]
 * @this {import('../types/base').default}
 * @returns {Promise<import('../types/base/validation').VtsValidationResults>}
 */
async function getValidationMessages(rules, field, label, enforceRule = null) {
  let invalidMessages = {};

  // TODO: if field is not required, no need to execute validation rules if there is no value
  for (const rule of registeredRules) {
    /** @type {import('../types/base/validation').VtsValidationResults} */
    const validationMessage = enforceRule
      ? await enforceRule.call(this, rules, field, label)
      : await rule.call(this, rules, field, label);
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
    if (isRequired || enforceRule) {
      break;
    }
  }

  return invalidMessages;
}

function validateCheckbox(field, rules, validMessage, renderClass) {
  const group = Vts.getGroupedFields(field);
  const lastField = group[group.length - 1];
  const isValid = group.some(
    (field) => field instanceof HTMLInputElement && field.checked
  );

  if (isValid) {
    group.forEach((gField) => (gField.required = false));
    this.renderFeedback.call(lastField, validMessage, renderClass);
  } else {
    group.forEach((gField) => (gField.required = true));
    this.renderFeedback.call(
      lastField,
      {
        required:
          rules?.message?.required ??
          this.message.required ??
          defaultMsg.required,
      },
      renderClass
    );
  }
}

function validateRadio(field, rules, validMessage, renderClass) {
  const group = Vts.getGroupedFields(field);
  const lastField = group[group.length - 1];
  const isValid = group.some((field) => field.checkValidity());

  if (isValid) {
    // field.setCustomValidity('');
    this.renderFeedback.call(lastField, validMessage, renderClass);
  } else {
    this.renderFeedback.call(
      lastField,
      {
        required:
          rules?.message?.required ??
          this.message.required ??
          defaultMsg.required,
      },
      renderClass
    );
  }
}

export default vtsValidation;
