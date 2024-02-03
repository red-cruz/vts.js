import type VtsCore from '.';

export default interface VtsEventsCore {
  _addFieldListener(this: VtsCore): void;
  _addEventListeners(this: VtsCore): void;
}
