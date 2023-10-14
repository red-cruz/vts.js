// @ts-check
import VtsFormValidator from '../utils/VtsFormValidator';

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

    // Match events
    this._attachMatchEvents();
  },
  _addFieldListener() {
    if (this.fields)
      this.fields.forEach((field) => {
        const fieldName = field.getAttribute('name');
        const rules = this._getFieldRules(fieldName || '');
        const eventType = this._getEventType(field.type, rules?.eventType);
        field.addEventListener(eventType, () => {
          this._checkFieldValidity(field);
        });
      });
  },
  _attachMatchEvents() {
    const ruleEntries = this.rules;
    if (typeof ruleEntries === 'object' && ruleEntries instanceof Map)
      for (const [fieldName, rule] of ruleEntries.entries()) {
        const match = rule.matches;
        const dependent = rule.requires;
        const form = this.form;
        const field = VtsFormValidator.validateField(form, fieldName);
        const rules = this._getFieldRules(fieldName);
        const eventType = this._getEventType(field.type, rules?.eventType);
        const inputEvent = new Event(eventType);
        if (match) {
          const matchField = VtsFormValidator.validateField(form, match);
          form.querySelector(`[name="${match}"]`);
          matchField.addEventListener(eventType, function () {
            field.dispatchEvent(inputEvent);
          });
        }
        if (dependent) {
          const neededField = VtsFormValidator.validateField(form, dependent);
          form.querySelector(`[name="${dependent}"]`);
          neededField.addEventListener(eventType, function () {
            if (neededField.value) {
              field.required = true;
              field.disabled = false;
            } else {
              field.disabled = true;
              field.required = false;
            }
            field.dispatchEvent(inputEvent);
          });
        }
      }
  },
  _getEventType(fieldType, ruleEventType) {
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
  },
};

export default vtsEvents;
