// @ts-check
import defaultMsg from '../defaults/defaultMsg';
import VtsFormValidator from '../utils/VtsFormValidator';
import attachEvent from '../utils/attachEvent';
import applyDateModifier from '../utils/validation/applyDateModifier';
import afterRule from './rules/after';
import equalToRule from './rules/equalTo';
import patternRule from './rules/pattern';
import requiredIfRule from './rules/requiredIf';
import validatorRule from './rules/validator';

/** @type {import('../types/base/rules').default} */
const vtsRules = {
  /**
   * @deprecated
   */
  async _applyRules(rules, field, label) {
    /**
     * contains array of validation message. empty string for valid
     * @type {import('../types/base/validation').VtsValidationMessages}
     */
    let validationMessages = {};
    const registeredRules = [
      validatorRule,
      patternRule,
      equalToRule,
      requiredIfRule,
      afterRule,
    ];

    for (const rule of registeredRules) {
      /** @type {import('../types/base/validation').VtsValidationMessages} */
      const validationMessage = await rule.call(this, rules, field, label);
      const key = Object.keys(validationMessage)[0];

      validationMessage[key] = validationMessage[key]
        .replace(/{:value}/g, field.value)
        .replace(/{:label}/g, label);

      validationMessages = Object.assign(validationMessages, validationMessage);
    }

    /** @type {string} */ // @ts-ignore
    const fieldName = field.getAttribute('name');

    // set custom validity
    if (Object.keys(validationMessages).length) {
      field.setCustomValidity(Object.values(validationMessages).join(', '));

      this._data.validFields.delete(fieldName);
      this._data.invalidFields.set(fieldName, {
        field,
        messages: validationMessages,
        label,
      });
    } else {
      field.setCustomValidity('');
      // @ts-ignore
      validationMessages.valid =
        rules?.message?.valid ?? this.message.valid ?? defaultMsg.valid;

      this._data.invalidFields.delete(fieldName);
      this._data.validFields.set(fieldName, {
        field,
        messages: validationMessages,
        label,
      });
    }

    return validationMessages;
  },

  _getFieldRules(fieldName) {
    const rules = this.rules;

    if (rules && rules instanceof Map) {
      return rules.get(fieldName);
    }

    return undefined;
  },

  _dateRule(rule, rules, field) {
    const targetField = VtsFormValidator.validateField(this.form, rules[rule]);

    if (!targetField) {
      console.warn(
        `The element with name "${rule}" is not a valid field element. 
            Please ensure you are passing the name of a valid field in the form.`
      );
      return targetField;
    }

    attachEvent(rule, targetField, field, rules);

    const targetDate = new Date(targetField.value);
    applyDateModifier(rules[rule], targetDate);

    return {
      targetField,
      targetDate,
    };
  },

  _convertRulesToMap() {
    const rules = this.rules;
    const rulesMap = new Map();

    for (const fieldName in rules) {
      if (Object.prototype.hasOwnProperty.call(rules, fieldName)) {
        rulesMap.set(fieldName, rules[fieldName]);
      }
    }

    this.rules = rulesMap;
  },

  _setCheckingRule(rules, field, label) {
    const checking = (
      rules.message?.checking ||
      this.message.checking ||
      defaultMsg.checking
    )
      .replace(/:{value}/g, field.value)
      .replace(/:{label}/g, label);

    field.setCustomValidity(checking);

    this._setValidityData(field, {
      field,
      label, // @ts-ignore
      message: { checking },
    });
    this._reportValidity();
  },
};

export default vtsRules;
