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
import getResponseMessageUtil from './utils/getResponseMessage.js';

/// <reference path="./Vts.d.ts" />
export default class Vts {
  /**
   * @param {string | HTMLFormElement} form
   * @param {import('./types/config/index.js').default} [config={}]
   */
  constructor(form, config = {}) {
    const elem = (this.form = VtsFormValidator.validateForm(form));
    this.fields = elem.querySelectorAll('[name]:not([data-vts-ignored])');
    // @ts-ignore
    this.#init(elem, config);
  }

  /**
   * @param {HTMLFormElement} form
   * @param {import('./types/config/index.js').default} config
   * @this {import('./types/base').default} Vts
   * @memberof Vts
   */
  #init(form, config) {
    // mixin
    Object.assign(this, vtsForm, setVtsConfig(form, config));
    Object.assign(Vts.prototype, vtsEvents, vtsRules, vtsValidation);
    this._convertRulesToMap();
    this._addEventListeners();
    const formId = form.getAttribute('id');
    const id = formId || 'Vts_form_' + Vts.#instances.size;
    // @ts-ignore
    Vts.#instances.set(id, this);
  }

  /**
   * @static
   * @type {Map<string, Vts>}
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
   * @param {Response} response
   * @returns {Promise<any>}
   */
  static async getResponseData(response) {
    return getResponseDataUtil(response);
  }

  /**
   * @param {*} data The parsed data from the server.
   * @param {Response|null} response The response from the server.
   * @param {import('./types/config/responseMessage').default} [defaultResponseMessages=vtsResponseMessages]
   * @returns {{title:string, message: string}} An object with the title and message of the error.
   */
  static getResponseMessage(data, response, defaultResponseMessages) {
    return getResponseMessageUtil(data, response, defaultResponseMessages);
  }
}
