// @ts-check
import defaultMsg from '../../defaults/defaultMsg';
import getFieldLabel from '../../utils/getFieldLabel';
import { inputRules } from '../rules';
import { requiredRule } from '../rules/required';
import validateCheckbox from './validateCheckbox';
import validateRadio from './validateRadio';

/** @type {import('../../types/core/validation').default} */
const vtsValidation = {
  async _validate(field) {
    const rules = this._getFieldRules(field);
    const label = getFieldLabel(rules.label, field, this.form);
    const validMessage = {
      valid: rules.messages?.valid ?? this.messages?.valid ?? defaultMsg.valid,
    };
    const renderClass = Object.assign(this.class, { wrapper: rules.wrapper });

    switch (field.type) {
      case 'checkbox':
        await validateCheckbox.call(
          this,
          field,
          rules,
          validMessage,
          renderClass
        );
        break;

      case 'radio':
        await validateRadio.call(this, field, rules, validMessage, renderClass);
        break;

      default:
        /** @type {import('../../types/core/validation').ValidationResults} */
        let invalidMessages = await validateFields.call(
          this,
          rules,
          field,
          label
        );

        let isInvalid = !!Object.keys(invalidMessages).length;

        // if invalid messages is empty but field is still invalid
        if (
          !isInvalid &&
          !field.validity.customError &&
          !field.validity.valid
        ) {
          // fallback validation for errors that vts is unable to handle
          return this.renderFeedback.call(
            field,
            {
              invalid:
                // rules.messages?.invalid ??
                // this.messages?.invalid ??
                field.validationMessage,
            },
            renderClass
          );
        }

        // set custom validity
        if (isInvalid) {
          const errorValidationMsg = Object.values(invalidMessages).join(', ');
          field.setCustomValidity(errorValidationMsg);
          this.renderFeedback.call(field, invalidMessages, renderClass);
        } else {
          field.setCustomValidity('');
          this.renderFeedback.call(field, validMessage, renderClass);
        }
    }
  },
};

/**
 * @param {import('../../types/config/rules').Rules[string]} rules
 * @param {import('../../types/core').VtsField} field
 * @param {string} label
 * @this {import('../../types/core').default}
 * @returns {Promise<import('../../types/core/validation').ValidationResults>}
 */
async function validateFields(rules, field, label) {
  const $this = this;
  let invalidMessages = {};

  /** @type {import('../../types/core/validation').ValidationResults} */
  await getInvalidMessages(requiredRule);

  if (!field.value) return invalidMessages;

  for (const rule of inputRules) {
    await getInvalidMessages(rule);
  }

  async function getInvalidMessages(ruleFn) {
    /** @type {import('../../types/core/validation').ValidationResults} */
    const validationMessage = await ruleFn.call($this, rules, field, label);
    const key = Object.keys(validationMessage)[0];

    if (key) {
      const messages = validationMessage[key];
      const value = field.value;
      const val = value || label;

      if (typeof messages === 'string') {
        validationMessage[key] = messages
          .replace(/{:value}/g, val)
          .replace(/{:label}/g, label)
          .replace(/{:length}/g, String(value.length));
      } else {
        // array
        for (const subKey in messages) {
          validationMessage[key][subKey] = messages[subKey]
            .replace(/{:value}/g, val)
            .replace(/{:label}/g, label)
            .replace(/{:length}/g, String(value.length));
        }
      }
    }

    invalidMessages = Object.assign(invalidMessages, validationMessage);
  }

  return invalidMessages;
}

export default vtsValidation;
