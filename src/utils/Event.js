export default class EventUtil {
  /**
   * Determines the event type.
   *
   * @static
   * @param {string} fieldType - The type attribute of the HTMLInputElement.
   * @param {string} ruleEventType - The event type specified in the rule.
   * @returns {string} - The determined event type.
   * @memberof EventUtil
   */
  static getType(fieldType, ruleEventType) {
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
}
