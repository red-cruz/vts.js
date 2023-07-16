// @ts-check
import VtsFormValidator from './utils/VtsFormValidator.js';
import vtsEvents from './mixins/Events.js';
import vtsRules from './mixins/Rules.js';
import vtsValidation from './mixins/Validation.js';
import setVtsConfig from './utils/setVtsConfig.js';
import vtsForm from './mixins/Form.js';
import vtsDefaults from './defaults/index.js';
import deepMerge from './utils/deepMerge.js';

/// <reference path="./ValidateThenSubmit.d.ts" />
export default class ValidateThenSubmit {
  constructor(formId, config = {}) {
    const form = VtsFormValidator.validateForm(formId);
    this.fields = form.querySelectorAll('[name]:not([data-vts-ignored])');
    this.form = form;
    this.#init(config);
  }

  #init(config) {
    const form = this.form;
    // mixin
    Object.assign(this, vtsForm, setVtsConfig(form, config));
    Object.assign(
      ValidateThenSubmit.prototype,
      vtsEvents,
      vtsRules,
      vtsValidation
    );

    // check instance
    VtsFormValidator.checkInstance(form.id);

    this._convertRulesToMap();
    this._addEventListeners();
  }

  static setDefaults(config) {
    deepMerge(vtsDefaults, config);
  }
}
