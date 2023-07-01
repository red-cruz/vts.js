import { getFieldLabel } from './getters';

/**
 * Applies validation rules to a field within a form and returns the validation result.
 *
 * @export
 * @param {VtsRules} rules - The validation rules to apply.
 * @param {HTMLFormElement} form - The form element containing the field.
 * @param {HTMLElement} field - The field element to apply the rules to.
 * @returns {[boolean, string, string, string]} - An array containing the validation result and related information.
 */
export default function applyRules(rules, form, field) {
  const label = getFieldLabel(field, form);
  let invalidTitle = 'Invalid ' + label;

  invalidMessage = rules.invalid?.title || invalidTitle;
  let pattern = rules.pattern;

  [valid = valid, invalidMessage = invalidMessage, pattern = pattern] =
    matchField(arguments);

  const regExp = new RegExp(pattern, rules.flags);

  if (regExp.test(field.value)) valid = true;
  return [valid, label, invalidTitle, invalidMessage];
}

/**
 * Matches the field value with a specified field name and returns the matching result.
 *
 * @param {String} matchFieldName - The name of the field to match.
 * @returns {[string, boolean]|[]} - An array containing the matching result or an empty array if no match field name is specified.
 */
function matchField(rules, form, field) {
  const matchFieldName = rules.match;

  if (!matchFieldName) return [];

  const matchTarget = form.querySelector('[name="' + matchFieldName + '"]');
  const defMismatchMsg =
    getFieldLabel(field, form) +
    ' did not match ' +
    getFieldLabel(matchTarget, form);
  /** @type {String} */
  const invalidRuleMessage = rules.invalid?.message.replace(
    '${value}',
    field.value
  );

  /** @type {String} */
  const invalidMessage = invalidRuleMessage || defMismatchMsg;
  const rawValue = matchTarget.value;
  return [invalidMessage, rawValue];
}
