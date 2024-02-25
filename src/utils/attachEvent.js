// @ts-check
import getEventType from './getEventType';

/**
 * @param {string} ruleName
 * @param {import('../types/core').VtsField} targetField
 * @param {import('../types/core').VtsField} field
 * @param {import('../types/config/rules').Rules[string]} rules
 */
export default function attachEvent(ruleName, targetField, field, rules) {
  const cstmAttr = `vts_${ruleName}_listener_exists`;
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
