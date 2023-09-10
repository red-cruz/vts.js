// @ts-check
'use strict';
import 'whatwg-fetch';
import vtsForm from './base/Form.js';
import VtsFormValidator from './utils/VtsFormValidator.js';
import vtsEvents from './base/Events.js';
import vtsRules from './base/Rules.js';
import vtsValidation from './base/Validation.js';
import setVtsConfig from './utils/setVtsConfig.js';
import vtsDefaults from './defaults/index.js';
import deepMerge from './utils/deepMerge.js';
import getResponseDataUtil from './utils/getResponseData.js';

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
    // @ts-ignore
    this._convertRulesToMap();
    // @ts-ignore
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

  /**
   * Gets the data from the response.
   *
   * This is a static method that asynchronously gets the data from the response.
   *
   * @param {Response} response The response object.
   * @returns {Promise<any>} A promise that resolves with the data from the response or rejects with an error.
   *
   * The data is parsed as based on *Content-Type*:
   *
   * * `application/json`: the data is parsed as an object using `response.json()`.
   * *  `text/html` or `text/plain`: the data is parsed as a string using `response.text()`.
   * *  If *neither* of the above, the data is `null`.
   */
  static async getResponseData(response) {
    return getResponseDataUtil(response);
  }
}
