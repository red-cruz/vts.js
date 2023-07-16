// @t
import VtsFormValidator from '../utils/VtsFormValidator';

/** @type {import('../ValidateThenSubmit').VtsEventsMixin} */
const vtsEvents = {
  _addEventListeners() {
    // Form
    const form = this.form;
    form.addEventListener('submit', (e) => {
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

      // validate each field
      for (const field of this.fields) this._checkFieldValidity(field);

      this._reportValidity();

      this.form.classList.add(formClass);

      if (this.isFormValid() && !this.halt) {
        this.submit();
      }
    });

    // Fields
    const shouldListen = this.listen;
    shouldListen && _addFieldListener();

    // Match events
    this._attachMatchEvents();
  },
  _addFieldListener() {
    this.fields.forEach((field) => {
      const rules = this._getFieldRules(field.name);
      const eventType = this._getEventType(field.type, rules?.eventType);
      field.addEventListener(eventType, () => {
        this._checkFieldValidity(field);
        this._reportValidity();
      });
    });
  },
  _attachMatchEvents() {
    for (const [fieldName, rule] of this.rules.entries()) {
      const match = rule.match;
      const form = this.form;
      const field = form.querySelector(`[name="${fieldName}"]`);
      const rules = this._getFieldRules(fieldName);
      const eventType = this._getEventType(field.type, rules?.eventType);
      if (match) {
        const inputEvent = new Event(eventType);
        const matchField = VtsFormValidator.validateField(form, match);
        form.querySelector(`[name="${match}"]`);
        matchField.addEventListener(eventType, function () {
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
