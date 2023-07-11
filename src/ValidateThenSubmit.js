// @ts-check
import VtsFormValidator from './utils/VtsFormValidator.js';
import vtsEvents from './mixins/Events.js';
import vtsRules from './mixins/Rules.js';
import vtsValidation from './mixins/Validation.js';
import setVtsConfig from './utils/setVtsConfig.js';
import vtsForm from './mixins/Form.js';
import vtsDefaults from './utils/defaults.js';
import deepMerge from './utils/deepMerge.js';

/// <reference path="./ValidateThenSubmit.d.ts" />
export default class ValidateThenSubmit {
  constructor(formId, config = {}) {
    const form = VtsFormValidator.validateForm(formId);
    const abortController = (this.abortController = new AbortController());
    this.config = setVtsConfig(form, config, abortController);
    this.fields = form.querySelectorAll('[name]:not([data-vts-ignored])');
    this.form = form;
    this.#init();
  }

  #init() {
    this.#mixin();
    const form = this.form;
    VtsFormValidator.checkInstance(form.id);
    this._convertRulesToMap();
    this._addEventListeners();
  }

  #mixin() {
    Object.assign(this, vtsForm);
    Object.assign(
      ValidateThenSubmit.prototype,
      vtsEvents,
      vtsRules,
      vtsValidation
    );
  }
  static setDefaults(config) {
    deepMerge(vtsDefaults, config);
  }
}
