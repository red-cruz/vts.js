import 'whatwg-fetch';
import VtsFormValidator from './utils/VtsFormValidator.js';
import vtsEvents from './mixins/Events.js';
import vtsRules from './mixins/Rules.js';
import vtsValidation from './mixins/Validation.js';
import setVtsConfig from './utils/setVtsConfig.js';
import vtsForm from './mixins/Form.js';
import vtsDefaults from './defaults/index.js';
import deepMerge from './utils/deepMerge.js';

/// <reference path="./vts.d.ts" />
export default class Vts {
  static #instances = new Map();

  static setDefaults(config) {
    deepMerge(vtsDefaults, config);
  }

  static getInstance(formId) {
    return Vts.#instances.get(formId);
  }

  static getOrCreateInstance(formId, config = {}) {
    const hasInstance = Vts.#instances.get(formId);
    if (hasInstance) return hasInstance;
    else return new Vts(formId, config);
  }

  static removeInstance(formId) {
    return Vts.#instances.delete(formId);
  }

  constructor(formId, config = {}) {
    const form = (this.form = VtsFormValidator.validateForm(formId));
    this.fields = form.querySelectorAll('[name]:not([data-vts-ignored])');
    this.#init(config);
  }

  #init(config) {
    const form = this.form;
    // mixin
    Object.assign(this, vtsForm, setVtsConfig(form, config));
    Object.assign(Vts.prototype, vtsEvents, vtsRules, vtsValidation);

    this._convertRulesToMap();
    this._addEventListeners();

    Vts.#instances.set(form.getAttribute('id'), this);
  }
}
