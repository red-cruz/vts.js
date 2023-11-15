import type VtsBase from '.';

export default interface VtsEventsBase {
  _addFieldListener(this: VtsBase): void;
  _addEventListeners(this: VtsBase): void;
}
