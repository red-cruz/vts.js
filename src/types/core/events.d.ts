import type VtsCore from '.';

export default interface VtsEventsBase {
  _addFieldListener(this: VtsCore): void;
  _addEventListeners(this: VtsCore): void;
}
