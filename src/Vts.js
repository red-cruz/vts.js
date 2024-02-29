// @ts-check
'use strict';
import 'whatwg-fetch';
import vtsForm from './core/Form.js';
import VtsFormValidator from './utils/VtsFormValidator.js';
import vtsEvents from './core/Events.js';
import vtsRules from './core/rules';
import vtsValidation from './core/validation';
import setVtsConfig from './utils/setVtsConfig.js';
import vtsDefaults from './defaults/index.js';
import deepMerge from './utils/deepMerge.js';
import getResponseDataUtil from './utils/getResponseData.js';
import getResponseMessageUtil from './utils/getResponseMessage.js';

const ignoredTypes = ['submit', 'reset', 'button', 'hidden']
  .map((type) => `:not([type="${type}"])`)
  .join('');

const fieldQuery = '[name]:not([data-vts-ignored])' + ignoredTypes;

/// <reference path="./Vts.d.ts" />
export default class Vts {
  /**
   * @param {string | HTMLFormElement} form
   * @param {import('./types/helpers').DeepPartial<import('./types/config').default>} [config={}]
   */
  constructor(form, config = {}) {
    const formElement = (this.form = VtsFormValidator.validateForm(form));

    if (formElement.vts instanceof Vts) {
      console.warn('Vts instance already exists', formElement);
    } else {
      this.fields = formElement.querySelectorAll(fieldQuery); // @ts-ignore
      this.#init(formElement, config);
      formElement.vts = this;
      formElement.classList.add('vts');
    }
  }

  /**
   * @param {HTMLFormElement} form
   * @param {import('./types/config/index.js').default} config
   * @this {import('./types/core').default} Vts
   * @memberof Vts
   */
  #init(form, config) {
    Object.assign(this, vtsForm, setVtsConfig(form, config));
    Object.assign(Vts.prototype, vtsEvents, vtsRules, vtsValidation);
    this._convertRulesToMap();
    this._setFieldAttributes();
    this._addEventListeners();
  }

  /** @this {import('./types/core').default} Vts */
  updateFields() {
    this.fields = this.form.querySelectorAll(fieldQuery);
    this._addFieldListener();
  }

  /** @this {import('./types/core').default} Vts */
  resetForm() {
    this.form.reset();
    this.form.classList.remove(this.class.form);
  }

  /** @this {import('./types/core').default} Vts */
  async validate() {
    for (const field of this.fields) {
      await this._validate(field);
    }
  }

  /** @param {import('./types/helpers').DeepPartial<import('./types/config').default>} config */
  static setDefaults(config) {
    deepMerge(vtsDefaults, config);
  }

  /** @param {Response} response */
  static async getResponseData(response) {
    const data = await getResponseDataUtil(response);
    return data;
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
   * @param {import('./types/core').VtsField} field
   * @returns {Array<import('./types/core').VtsField|Element>}
   */
  static getGroupedFields(field) {
    const form = field.closest('form');
    const fields = form?.querySelectorAll(fieldQuery);

    if (!form || !fields) return [];

    const fieldName = field.name;

    if (!/\[.*\]/.test(field.name)) {
      // Find all matching inputs
      const groupedFields = [];

      for (const gField of fields) {
        //@ts-ignore
        fieldName === gField.name && groupedFields.push(gField);
      }
      return groupedFields;
    }

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
      groupRegex.test(gField.name) && groupedFields.push(gField);
    }

    return groupedFields;
  }
}
