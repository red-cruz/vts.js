// @ts-check
import getEventType from '../utils/getEventType';

/** @type {import('../types/core/events').default} */
const vtsEvents = {
  async _addEventListeners() {
    // Form
    const form = this.form;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (this.stopPropagation) {
        e.stopPropagation();
      }

      const formClass = this.class.form;
      const wasValidated = form.classList.contains(formClass);
      const shouldListen = this.listen;
      if (!shouldListen && !wasValidated) {
        this._addFieldListener();
      }

      this.form.classList.add(formClass);
      await this.validate();

      if (this.isFormValid() && !this.halt) {
        this.submit().catch(() => {});
      }
    });

    // Fields
    const shouldListen = this.listen;
    shouldListen && this._addFieldListener();
  },

  _addFieldListener() {
    this.fields.forEach((field) => {
      const cstmAttr = 'vts_listener_exists';
      const listenerExists = field.dataset[cstmAttr];

      if (listenerExists) return;
      field.dataset[cstmAttr] = 'true';

      const rules = this._getFieldRules(field);
      const eventType = getEventType(field.type, rules.eventType);

      field.addEventListener(eventType, () => {
        this._validate(field);
      });
    });
  },
};

export default vtsEvents;
