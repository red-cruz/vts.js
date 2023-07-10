/** @type {import('../ValidateThenSubmit').VtsEventsMixin} */
const vtsEvents = {
  _addEventListeners() {
    const form = this.form;
    // Form
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.config.stopPropagation) {
        e.stopPropagation();
      }

      // this.#log.start();
      this._validate();
      this.form.classList.add(this.config.validatedClass);

      if (this.isFormValid() && !this.config.halt) {
        this.submit();
      }
    });

    // Fields
    this.fields.forEach((field) => {
      const rules = this._getFieldRules(field.name);
      const match = rules?.match;
      const eventType = this._getEventType(field.type, rules?.eventType);
      field.addEventListener(eventType, () => {
        this._checkFieldValidity(field);
        this._reportValidity();
      });
    });

    // Match events
    this._attachMatchEvents();
  },
  _attachMatchEvents() {
    for (const [fieldName, rule] of this.config.rules.entries()) {
      const match = rule.match;
      const form = this.form;
      const field = form.querySelector(`[name="${fieldName}"]`);
      const rules = this._getFieldRules(fieldName);
      const eventType = this._getEventType(field.type, rules?.eventType);
      if (match) {
        const inputEvent = new Event(eventType);
        const matchField = form.querySelector(`[name="${match}"]`);
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
