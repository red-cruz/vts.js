import type VtsBase from '.';

export default interface VtsEventsBase {
  _addFieldListener(this: VtsBase): void;
  _addEventListeners(this: VtsBase): void;
  _attachMatchEvents(this: VtsBase): void;
  _getEventType(fieldType: string, ruleEventType?: string): string;
}
