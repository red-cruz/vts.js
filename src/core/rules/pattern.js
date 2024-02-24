// @ts-check

import defaultMsg from '../../defaults/defaultMsg';
import VtsFormValidator from '../../utils/VtsFormValidator';
import attachEvent from '../../utils/attachEvent';

/**
 * @param {import('../../types/config/rules').Rules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/core/index').default} Vts
 * @returns {Promise<import('../../types/core/validation').ValidationResults>}
 */
export default async function patternRule(rules, field, label) {
  /** @type {import('../../types/config/rules').Rule<string | RegExp> } */ //@ts-ignore
  const patternRule = rules.pattern;

  if (!patternRule) return {};

  /** @type {RegExp} */
  let patternRegExp;

  const getErrMsg = (str = patternRegExp?.source) => {
    const errMsg = {
      pattern:
        rules.messages?.pattern || this.messages?.pattern || defaultMsg.pattern,
    };

    errMsg.pattern = errMsg.pattern.replace(/{:pattern}/g, str);

    return errMsg;
  };

  switch (typeof patternRule) {
    case 'function':
      this._setCheckingRule(rules, field, label);
      const pattern = await patternRule(field, label);

      if (typeof pattern === 'string') {
        let strSrc = pattern;
        if (pattern.startsWith('field:')) {
          const targetField = VtsFormValidator.validateField(
            this.form,
            pattern.replace('field:', '')
          );
          attachEvent('pattern', targetField, field, rules);
          strSrc = targetField.value;
        }
        try {
          patternRegExp = new RegExp(pattern);
        } catch (error) {
          return getErrMsg();
        }
      } else patternRegExp = pattern;
      break;

    case 'object':
      if (patternRule instanceof RegExp) patternRegExp = patternRule;
      else {
        console.error('Pattern rule must be an instance of RegExp', field);
        return getErrMsg();
      }
      break;

    default:
      let strSrc = patternRule;
      if (patternRule.startsWith('field:')) {
        const targetField = VtsFormValidator.validateField(
          this.form,
          patternRule.replace('field:', '')
        );
        attachEvent('pattern', targetField, field, rules);
        strSrc = targetField.value;
      }
      try {
        patternRegExp = new RegExp(patternRule);
      } catch (error) {
        return getErrMsg();
      }
  }

  return patternRegExp.test(field.value) ? {} : getErrMsg();
}
