import Vts from '../../ValidateThenSubmit';
/**
 * Retrieves a list of validated fields within the given form based on a specified state.
 *
 * @param {HTMLFormElement} form - The form element to search within.
 * @param {String} state - The state to filter the fields by.
 * @returns {NodeListOf<Element>} - A list of validated fields.
 */
export default function getValidatedFields(form, state) {
  const not = ':not([data-vts-ignored], [type="submit"])';
  return form.querySelectorAll(`:${state}` + not);
}

/**
 * Retrieves the label for the specified field within the given form.
 *
 * @param {HTMLElement} field - The field element for which to retrieve the label.
 * @param {HTMLFormElement} form - The form element containing the field.
 * @returns {string} - The label text.
 */
export function getFieldLabel(field, form) {
  const dataLabel = field.dataset.vtsLabel;
  const labelElement = form.querySelector(`label[for="${field.id}"]`);
  const labelText = labelElement?.textContent;
  const placeholder = field.getAttribute('placeholder');
  const label = dataLabel || labelText || placeholder || '';
  return label;
}

/**
 * Retrieves the rules for the specified field name from a given set of rules.
 *
 * @param {VtsRules} rules - The set of rules to retrieve the field rules from.
 * @param {string} fieldName - The name of the field to retrieve the rules for.
 * @returns {Object|undefined} - The field rules.
 */
export function getFieldRules(rules, fieldName) {
  return rules[fieldName];
}

/**
 * Determines the event type based on the field type and rule event type.
 *
 * @param {string|undefined} fieldType - The type attribute.
 * @param {string} ruleEventType - The event type specified in the rule.
 * @returns {string} - The determined event type.
 */
export function getEventType(fieldType, ruleEventType) {
  const changeEvents = [
    'radio',
    'select-one',
    'select-multiple',
    'checkbox',
    'file',
    'range',
  ];

  // Update event to 'change' based on the field type
  let eventType = changeEvents.includes(fieldType) ? 'change' : 'input';

  // Update event based on the specified rule
  eventType = ruleEventType || eventType;

  return eventType;
}
