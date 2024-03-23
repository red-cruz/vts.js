// @ts-check
'use strict';
import VtsStatic from './static/index';
import setVtsConfig from './instance/setVtsConfig';
import { FIELD_QUERY, FORM_FIELD_QUERY } from './constants/index';

/// <reference path="./vts.d.ts" />
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
      this.fields = getVtsFields(formElement);

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

function getVtsFields(formElement) {
  if (formElement.id) {
    const el = document.querySelector(`#${formElement.id} ${FORM_FIELD_QUERY}`);
    console.log(el);
    const selectors = `form#${formElement.id} ${FIELD_QUERY.replace(/{:formId}/g, formElement.id)}`;
    // console.log();
    return document.querySelectorAll(selectors);
  }

  return formElement.querySelectorAll(FORM_FIELD_QUERY);
}
