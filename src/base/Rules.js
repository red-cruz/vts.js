// @ts-check
import VtsFormValidator from '../utils/VtsFormValidator';
import attachEvent from '../utils/attachEvent';
import applyDateModifier from '../utils/validation/applyDateModifier';
import afterRule from './rules/after';
import equalToRule from './rules/equalTo';
import patternRule from './rules/pattern';
import requiredIfRule from './rules/requiredIf';
import validatorRule from './rules/validator';

const validState = '';

/** @type {import('../types/base/rules').default} */
const vtsRules = {
  async _applyRules(rules, field, label) {
    /**
     * contains array of validation message. empty string for valid
     * @type {string[]}
     */
    const states = [];
    const registeredRules = [
      validatorRule,
      patternRule,
      equalToRule,
      requiredIfRule,
      afterRule,
    ];

    for (const rule of registeredRules) {
      /** @type {string} */
      const validationMessage = await rule.call(this, rules, field, label);
      states.push(validationMessage);
    }

    let message = '';
    for (const state of states) {
      field.setCustomValidity(state);
      if (state === validState) {
        message = rules.message?.valid ?? this.message.valid ?? '';
      } else {
        message = state;
        break;
      }
    }

    return message;
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
    // @ts-ignore
    const checkingMsg = (rules.message?.checking || this.message.checking)
      .replace(/:{value}/g, field.value)
      .replace(/:{label}/g, label);

    field.setCustomValidity(checkingMsg);
    this._setValidityData(field, {
      field,
      label,
      message: checkingMsg,
    });
    this._reportValidity();
  },
};

export default vtsRules;
