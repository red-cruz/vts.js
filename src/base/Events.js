// @ts-check
import getEventType from '../utils/getEventType';

/** @type {import('../types/base/events').default} */
const vtsEvents = {
  _addEventListeners() {
    // Form
    const form = this.form;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (this.stopPropagation) {
        e.stopPropagation();
      }

      const formClass = this.class.form || 'was-validated';
      const wasValidated = form.classList.contains(formClass);
      const shouldListen = this.listen;
      if (!shouldListen && !wasValidated) {
        this._addFieldListener();
      }

      this.form.classList.add(formClass);
      // validate each field
      for (const field of this.fields) {
        await this._checkFieldValidity(field);
      }

      if (this.isFormValid() && !this.halt) {
        this.submit().catch(() => {});
      }
    });

    // Fields
    const shouldListen = this.listen;
    shouldListen && this._addFieldListener();
  },
  _addFieldListener() {
    if (this.fields)
      this.fields.forEach((field) => {
        const fieldName = field.getAttribute('name');
        const rules = this._getFieldRules(fieldName || '');
        const eventType = getEventType(field.type, rules?.eventType);
        field.addEventListener(eventType, () => {
          this._checkFieldValidity(field);
        });
      });
  },
};

export default vtsEvents;
