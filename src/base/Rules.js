// @ts-check
import VtsFormValidator from '../utils/VtsFormValidator';
import getFieldLabel from '../utils/getFieldLabel';

/** @type {import('../types/base/rules').default} */
const vtsRules = {
  async _applyRules(rules, field, label) {
    let message = this.message.invalid || 'Invalid field';
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
      if (neededField.value) {
        field.required = true;
        field.disabled = false;
      } else {
        field.disabled = true;
        field.required = false;
      }
      neededField = neededField.value;
    }

    // custom validator function
    let validator = '';
    const customValidator = rules.validator;
    if (customValidator) {
      const label = getFieldLabel(field, this.form); // @ts-ignored
      const loadingMsg = (rules.message?.loading || this.message.loading)
        .replace(/\${value}/g, field.value)
        .replace(/\${label}/g, label);

      field.setCustomValidity(loadingMsg);
      this._setValidityData(field, {
        field,
        label,
        message: loadingMsg,
      });
      this._reportValidity();
      validator = (await customValidator(field, label)) || '';
    }

    // set validity
    const regExp = new RegExp(pattern, rules.flags);
    if ((neededField || regExp.test(field.value)) && validator === '') {
      message = rules.message?.valid ?? this.message.valid ?? '';
      field.setCustomValidity('');
    } else {
      message = validator || rules.message?.invalid || message;
      field.setCustomValidity(message);
    }

    // replace message placeholders for 'matches'
    if (matches && matchingField) {
      message = message
        ?.replace(/\${targetValue}/g, matchValue)
        .replace(/\${targetLabel}/g, getFieldLabel(matchingField, this.form));
    }

    warnMultiRule(rules, label);

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

/**
 * Displays a warning message if both "pattern" and "matches" properties exist in the field rule.
 *
 * @private
 * @param {import('../types/config/rules').VtsRules[string]} rules - The validation rules for the field.
 * @param {string} label - The label of the field.
 */
function warnMultiRule(rules, label) {
  if ('pattern' in rules && 'matches' in rules) {
    console.warn(
      `Both "pattern" and "matches" properties exist in the field rule for ${label}. ` +
        'Ignoring the "matches" property.'
    );
  }
}
