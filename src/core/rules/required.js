// @ts-check
import defaultMsg from '../../defaults/defaultMsg';
import VtsFormValidator from '../../utils/VtsFormValidator';
import attachEvent from '../../utils/attachEvent';

/**
 * @this {import('../../types/core/index').default}
 * @param {import('../../types/config/rules').Rules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 */
export async function isFieldRequired(rules, field, label) {
  /** @type {import('../../types/config/rules').Rule<string | boolean> } */ //@ts-ignore
  const requiredRule = rules.required;

  switch (typeof requiredRule) {
    case 'function':
      this._setCheckingRule(rules, field, label);
      const required = await requiredRule(field, label);
      if (typeof required === 'string') {
        if (required.startsWith('field:')) {
          const targetField = VtsFormValidator.validateField(
            this.form,
            required.replace('field:', '')
          );
          attachEvent('required', targetField, field, rules);
          return !!targetField?.value;
        }
        return required === 'true';
      }
      return required;

    case 'boolean':
      return requiredRule;

    default:
      if (requiredRule.startsWith('field:')) {
        const targetField = VtsFormValidator.validateField(
          this.form,
          requiredRule.replace('field:', '')
        );
        attachEvent('required', targetField, field, rules);
        return !!targetField?.value;
      }
      return requiredRule === 'true';
  }
}

/**
 * @param {import('../../types/config/rules').Rules[string]} rules
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {string} label
 * @this {import('../../types/core/index').default} Vts
 * @returns {Promise<import('../../types/core/validation').ValidationResults>}
 */
export async function requiredRule(rules, field, label) {
  const ruleMsg = rules.messages?.required || this.messages?.required;
  const required = await isFieldRequired.call(this, rules, field, label);

  if (required && !field.value) {
    return {
      required: ruleMsg || defaultMsg.required,
    };
  }

  return {};
}

// /**
//  * @param {import('../../types/config/rules').Rules[string]} rules
//  * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
//  * @param {string} label
//  * @this {import('../../types/core/index').default} Vts
//  * @returns {Promise<import('../../types/core/validation').ValidationResults>}
//  */
// export async function requiredIfRule(rules, field, label) {
//   const requiredIf = rules.requiredIf;
//   const isFunction = typeof requiredIf === 'function';

//   if ((!isFunction && !requiredIf) || isRequiredAndInvalid(rules, field)) {
//     return {};
//   }

//   let isInvalid = false;

//   let invalidMsg =
//     rules.messages?.requiredIf ||
//     this.messages?.requiredIf ||
//     defaultMsg.requiredIf;

//   if (isFunction) {
//     this._setCheckingRule(rules, field, label);
//     isInvalid = await requiredIf(field, label, this.form);
//   } else {
//     const requiredField = VtsFormValidator.validateField(this.form, requiredIf);
//     if (!requiredField) {
//       console.warn(
//         `The element with name "${requiredIf}" is not a valid field element.
//             Please ensure you are passing the name of a valid field in the form.`
//       );
//       return {};
//     }

//     isInvalid = !!requiredField.value && !field.value;
//     invalidMsg = invalidMsg
//       .replace(/{:targetValue}/g, requiredField.value)
//       .replace(
//         /{:targetLabel}/g,
//         getFieldLabel(rules, requiredField, this.form)
//       );

//     attachEvent('requiredIf', requiredField, field, rules);
//   }

//   return isInvalid ? { requiredIf: invalidMsg } : {};
// }
