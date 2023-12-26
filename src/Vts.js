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
    this.fields = elem.querySelectorAll(
      '[name]:not([data-vts-ignored]):not([type="submit"]):not([type="reset"]):not([type="button"]):not([type="hidden"])'
    ); // @ts-ignore
    this.#init(elem, config);
    elem.vts = this;
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
  }

  /**
   * @static
   * @param {import('./types/config/index.js').default} config
   * @memberof Vts
   */
  static setDefaults(config) {
    deepMerge(vtsDefaults, config);
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

  /**
   * @param {NodeListOf<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>} fields
   * @param {string} fieldName
   * @returns {Array<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>}
   */
  static getGroupedFields(fields, fieldName) {
    // Build regular expression
    const baseName = fieldName.split('[')[0];
    const dynamicParts = fieldName
      .split(']')
      .slice(1)
      .map((part) => part.split('[')[1]);
    let regexPattern = `^${baseName}`;

    if (dynamicParts.length > 0) {
      regexPattern += `(\\[${dynamicParts.join('|')}\\])?`;
    }

    const groupRegex = new RegExp(regexPattern);

    // Find all matching inputs
    const groupedFields = [];

    for (const field of fields) {
      if (groupRegex.test(field.name)) {
        groupedFields.push(field);
      }
    }

    return groupedFields;
  }
}
