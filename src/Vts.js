// @ts-check
'use strict';
import VtsStatic from './static/index';
import setVtsConfig from './instance/setVtsConfig';
import { FIELD_QUERY } from './constants/index';

/// <reference path="./Vts.d.ts" />
export default class Vts extends VtsStatic {
  /**
   * @param {string|HTMLFormElement} form - The form element or its selector
   * @param {import('../types/config/index').default} [config] - Optional configuration object
   */
  constructor(form, config) {
    super();
    const formElement = (this.form = Vts.getForm(form));
    if (formElement.vts instanceof Vts) {
      console.warn('Vts instance already exists: ', formElement.vts);
    } else {
      this.fields = formElement.querySelectorAll(FIELD_QUERY);

      formElement.classList.add('vts');
      Object.assign(this, setVtsConfig(formElement, config));
      // Object.assign(this, vtsForm, setVtsConfig(formElement, config));
      // Object.assign(Vts.prototype, vtsEvents, vtsRules, vtsValidation);
      // this._convertRulesToMap();
      // this._setFieldAttributes();
      // this._addEventListeners();

      // @ts-expect-error properties and methods are assigned via mixins above
      formElement.vts = this;
    }
  }
}
