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
      valid: rules?.message?.valid ?? this.message?.valid ?? defaultMsg.valid,
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
 * @this {import('../types/base').default}
 * @returns {Promise<import('../types/base/validation').VtsValidationResults>}
 */
async function getValidationMessages(rules, field, label) {
  let invalidMessages = {};

  // TODO: if field is not required, no need to execute validation rules if there is no value
  for (const rule of registeredRules) {
    /** @type {import('../types/base/validation').VtsValidationResults} */
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

/**
 * @param {HTMLInputElement} field
 * @param {import('../types/config/rules').VtsRules[string]|undefined} rules
 * @param {{valid:string}} validMessage
 * @param {{}} renderClass
 * @this {import('../types/base').default}
 */
function validateCheckbox(field, rules, validMessage, renderClass) {
  const group = Vts.getGroupedFields(field);
  const label = getFieldLabel(rules?.label, field, this.form);
  const lastField = group[group.length - 1];

  const checkedItems = group
    .map((gField) => gField instanceof HTMLInputElement && gField.checked)
    .filter(Boolean).length;

  const invalidMsgObj = {};

  let isValid = true;

  const min = rules?.min || Number(field.dataset.vtsRuleMin);
  if (min && checkedItems < min) {
    isValid = false;
    invalidMsgObj.min = (
      rules?.message?.min ??
      this.message?.min ??
      defaultMsg.min
    )
      .replace(/{:min}/g, String(min))
      .replace(/{:label}/g, label);
  } else {
    const hasChecked = group.some(
      (gField) => gField instanceof HTMLInputElement && gField.checked
    );

    const hasRequiredRule =
      rules?.required ||
      Boolean(
        field.dataset.vtsRuleRequired !== undefined &&
          field.dataset.vtsRuleRequired != 'false'
      );

    if (hasRequiredRule && !hasChecked) {
      isValid = false;
      invalidMsgObj.required = (
        rules?.message?.required ??
        this.message?.required ??
        defaultMsg.required
      ).replace(/{:label}/g, label);
    }
  }

  const max = rules?.max || Number(field.dataset.vtsRuleMax);
  if (max && checkedItems > max) {
    isValid = false;
    invalidMsgObj.max = (
      rules?.message?.max ??
      this.message?.max ??
      defaultMsg.max
    )
      .replace(/{:max}/g, String(max))
      .replace(/{:label}/g, label);
  }

  if (isValid) {
    group.forEach((gField) => {
      gField.required = false;
      gField.setCustomValidity('');
    });
    this.renderFeedback.call(lastField, validMessage, renderClass);
  } else {
    group.forEach((gField) => {
      gField.required = true;
      gField.setCustomValidity(Object.keys(invalidMsgObj).join(','));
    });
    this.renderFeedback.call(lastField, invalidMsgObj, renderClass);
  }
}

/**
 * @param {HTMLInputElement} field
 * @param {import('../types/config/rules').VtsRules[string]|undefined} rules
 * @param {{valid:string}} validMessage
 * @param {{}} renderClass
 * @this {import('../types/base').default}
 */
async function validateRadio(field, rules, validMessage, renderClass) {
  const group = Vts.getGroupedFields(field);
  const lastField = group[group.length - 1];
  const isValid = group.some((field) => field.checkValidity());

  if (isValid) {
    this.renderFeedback.call(lastField, validMessage, renderClass);
  } else {
    this.renderFeedback.call(
      lastField,
      {
        required:
          rules?.message?.required ??
          this.message?.required ??
          defaultMsg.required,
      },
      renderClass
    );
  }
}

export default vtsValidation;
