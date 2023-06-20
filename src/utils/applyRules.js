import Vts from '../vts';
import { show } from './log';
import getLabel from './getLabel';

/**
 * @description
 * @author RED
 * @export
 * @param {Vts} Vts
 * @returns {Array}
 */
export default function applyRules(Vts) {
  const form = Vts.form;
  const field = Vts.currentField;
  const rule = Vts.config.rules[field.name];
  const value = field.value;
  let invalidTitle = 'Invalid ' + getLabel(form, field);
  let invalidMessage = field.validationMessage;
  let valid;

  // check if field has rule
  if (rule) {
    const match = rule.match;
    const pattern = new RegExp(rule.pattern, rule.flags);
    invalidTitle = rule.title;
    field.setAttribute('pattern', pattern.source);

    if (match) {
      [invalidMessage, valid] = matcher(Vts, match);
    } else {
      show(Vts.config.log, 'log', 'processing pattern:', pattern);
      valid = value.match(pattern);
    }
    // set custom validity
    if (valid) field.setCustomValidity('');
    else field.setCustomValidity(invalidMessage);
  }
  return [invalidTitle, invalidMessage];
}

/**
 * @description
 * @author RED
 * @param {Vts} Vts
 * @param {String} match
 * @returns {Array}
 */
function matcher(Vts, match) {
  const form = Vts.form;
  const formData = Vts.formData;
  const field = Vts.currentField;
  show(Vts.config.log, 'log', 'matching to:', match);
  const srcMatch = form.querySelector('[name="' + match + '"]');
  const defMismatchMsg =
    getLabel(form, field) + ' did not match ' + getLabel(form, srcMatch);
  const invalidMessage = rule.message || defMismatchMsg;
  const valid = value == formData.get(match);

  return [invalidMessage, valid];
}
