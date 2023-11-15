import getEventType from './getEventType';

/**
 * @param {string} ruleName
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} targetField
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 * @param {import('../../types/config/rules').VtsRules[string]} rules
 */
export default function attachEvent(ruleName, targetField, field, rules) {
  const cstmAttr = `vts_${ruleName}_listener_exists`;
  const listenerExists = targetField.dataset[cstmAttr];
  const eventType = getEventType(field.type, rules?.eventType);

  if (listenerExists || !eventType) return;

  targetField.addEventListener(eventType, function () {
    field.dispatchEvent(new Event(eventType));
  });

  targetField.dataset[cstmAttr] = 'true';
}
