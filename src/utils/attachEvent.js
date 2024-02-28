// @ts-check
import getEventType from './getEventType';

/**
 * @param {import('../types/config/rules').RuleKey} ruleName
 * @param {import('../types/core').VtsField} targetField
 * @param {import('../types/core').VtsField} field
 * @param {import('../types/config/rules').Rules[string]} rules
 */
export default function attachEvent(ruleName, targetField, field, rules) {
  const fieldName = replaceNonWordCharacters(field.name);
  const rule_name = replaceNonWordCharacters(ruleName);
  const cstmAttr = `vts_${rule_name}_bound_to_${fieldName}`;
  const listenerExists = targetField.dataset[cstmAttr];
  const eventType = getEventType(field.type, rules.eventType);

  if (listenerExists || !eventType) return;

  targetField.addEventListener(eventType, function (event) {
    if (cstmAttr === 'vts_required_listener_exists') {
    }
    field.dispatchEvent(new Event(eventType));
  });

  targetField.dataset[cstmAttr] = 'true';
}

/**
 * @param {string} str
 */
function replaceNonWordCharacters(str) {
  return str.replace(/[^a-zA-Z]/g, '_').toLocaleLowerCase();
}
