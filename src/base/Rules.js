// @ts-check
import equalToRule from './rules/equalTo';
import patternRule from './rules/pattern';
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
    const registeredRules = [validatorRule, patternRule, equalToRule];

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
        message =
          state ??
          rules.message?.invalid ??
          this.message.invalid ??
          'Invalid field';
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
