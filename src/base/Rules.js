// @ts-check
import VtsFormValidator from '../utils/VtsFormValidator';
import getFieldLabel from '../utils/getFieldLabel';
import validatorRule from './rules/validator';

const validState = '';

/** @type {import('../types/base/rules').default} */
const vtsRules = {
  async _applyRules(rules, field, label) {
    let message = this.message.invalid ?? 'Invalid field';
    let pattern = ('pattern' in rules ? rules.pattern : '') || '';
    const matches =
      'matches' in rules && !('pattern' in rules) ? rules.matches : false;

    let matchingField;
    let matchValue = '';

    // overwrite pattern
    pattern = rules.flags?.includes('g') ? pattern + '\\b' : pattern;

    if (matches) {
      // get matching field target
      matchingField = VtsFormValidator.validateField(this.form, matches);
      if (!matchingField) {
        console.warn(
          `The element with name "${matches}" is not a valid field element. 
            Please ensure you are passing the name of a valid field in the form.`
        );
        return message;
      }

      // get value of target field
      matchValue = matchingField.value;
      // overwrite pattern
      pattern = rules.flags?.includes('g')
        ? matchValue + '\\b'
        : `^${matchValue}$`;
    }

    const dependent = rules.requires;
    let neededField = null;
    if (dependent) {
      neededField = VtsFormValidator.validateField(this.form, dependent);
      if (!neededField) {
        console.warn(
          `The element with name "${dependent}" is not a valid field element. 
            Please ensure you are passing the name of a valid field in the form.`
        );
        return message;
      }

      if (neededField.value) {
        field.required = true;
        field.disabled = false;
      } else {
        field.disabled = true;
        field.required = false;
      }
      neededField = neededField.value;
    }

    /**
     * contains array of validation message. empty string for valid
     * @type {string[]}
     */
    const states = [];
    const registeredRules = [validatorRule];

    for (const rule of registeredRules) {
      const validationMessage = await rule.call(this, rules, field, label);
      states.push(validationMessage);
    }

    for (const state of states) {
      field.setCustomValidity(state);
      if (state === validState) {
        message = state ?? rules.message?.valid ?? this.message.valid ?? '';
      } else {
        message = state ?? rules.message?.invalid ?? message;
        break;
      }
    }

    // set validity
    // const regExp = new RegExp(pattern, rules.flags);
    // if (neededField || regExp.test(field.value)) {
    //   message = rules.message?.valid ?? this.message.valid ?? '';
    //   field.setCustomValidity('');
    // } else {
    //   message = rules.message?.invalid || message;
    //   field.setCustomValidity(message);
    // }

    // replace message placeholders for 'matches'
    if (matches && matchingField) {
      message = message
        ?.replace(/:{targetValue}/g, matchValue)
        .replace(/:{targetLabel}/g, getFieldLabel(matchingField, this.form));
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
};

export default vtsRules;
