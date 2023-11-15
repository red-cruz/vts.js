export default function getEventType(fieldType, ruleEventType) {
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
