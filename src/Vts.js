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

const fieldQuery =
  '[name]:not([data-vts-ignored]):not([type="submit"]):not([type="reset"]):not([type="button"]):not([type="hidden"])';

/// <reference path="./Vts.d.ts" />
export default class Vts {
  /**
   * @param {string | HTMLFormElement} form
   * @param {import('./types/config/index.js').default} [config={}]
   */
  constructor(form, config = {}) {
    const elem = (this.form = VtsFormValidator.validateForm(form));
    this.fields = elem.querySelectorAll(fieldQuery); // @ts-ignore
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
    Object.assign(this, vtsForm, setVtsConfig(form, config));
    Object.assign(Vts.prototype, vtsEvents, vtsRules, vtsValidation);
    this._convertRulesToMap();
    this._addEventListeners();
  }

  /**
   * @this {import('./types/base').default} Vts
   * @memberof Vts
   */
  updateFields() {
    this.fields = this.form.querySelectorAll(fieldQuery);
    this._addFieldListener();
  }

  /**
   * @this {import('./types/base').default} Vts
   * @memberof Vts
   */
  resetForm() {
    this.form.reset();
    this.form.classList.remove(this.class.form);
  }

  /**
   * Validates each field.
   * @this {import('./types/base').default} Vts
   * @memberof Vts
   */
  async validate() {
    for (const field of this.fields) {
      await this._validate(field);
    }
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
   * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
   * @returns {Array<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement|Element>}
   */
  static getGroupedFields(field) {
    const form = field.closest('form');
    const fields = form?.querySelectorAll(fieldQuery);

    if (!form || !fields) return [];

    const fieldName = field.name;

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

    for (const gField of fields) {
      //@ts-ignore
      if (groupRegex.test(gField.name)) {
        groupedFields.push(gField);
      }
    }

    return groupedFields;
  }
}
