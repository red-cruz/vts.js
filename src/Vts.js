// @ts-check
import 'whatwg-fetch';
import vtsForm from './base/Form.js';
import VtsFormValidator from './utils/VtsFormValidator.js';
import vtsEvents from './base/Events.js';
import vtsRules from './base/Rules.js';
import vtsValidation from './base/Validation.js';
import setVtsConfig from './utils/setVtsConfig.js';
import vtsDefaults from './defaults/index.js';
import deepMerge from './utils/deepMerge.js';

/// <reference path="./Vts.d.ts" />
export default class Vts {
  /**
   * @param {string} formId
   * @param {import('./types/config/index.js').default} [config={}]
   */
  constructor(formId, config = {}) {
    const form = (this.form = VtsFormValidator.validateForm(formId));
    this.fields = form.querySelectorAll('[name]:not([data-vts-ignored])');
    this.#init(config);
  }

  /**
   * @param {import('./types/config/index.js').default} config
   * @memberof Vts
   */
  #init(config) {
    const form = this.form;
    // mixin
    Object.assign(this, vtsForm, setVtsConfig(form, config));
    Object.assign(Vts.prototype, vtsEvents, vtsRules, vtsValidation);

    this._convertRulesToMap();
    this._addEventListeners();

    // @ts-ignore
    Vts.#instances.set(form.getAttribute('id'), this);
  }

  /**
   * @static
   * @type {Map<string, Vts}
   * @memberof Vts
   */
  static #instances = new Map();

  /**
   * @static
   * @param {import('./types/config/index.js').default} config
   * @memberof Vts
   */
  static setDefaults(config) {
    deepMerge(vtsDefaults, config);
  }

  /**
   * @static
   * @param {string} formId
   * @memberof Vts
   */
  static getInstance(formId) {
    return Vts.#instances.get(formId);
  }

  /**
   * @static
   * @param {string} formId
   * @param {import('./types/config/index.js').default} [config={}]
   * @returns {Vts}
   * @memberof Vts
   */
  static getOrCreateInstance(formId, config = {}) {
    const hasInstance = Vts.#instances.get(formId);
    return hasInstance ? hasInstance : new Vts(formId, config);
  }

  /**
   * @static
   * @param {string} formId
   * @returns {boolean}
   * @memberof Vts
   */
  static removeInstance(formId) {
    return Vts.#instances.delete(formId);
  }
}
