// @ts-check
'use strict';
import VtsStatic from './static/index';
import setVtsConfig from './instance/setVtsConfig';

/// <reference path="./vts.d.ts" />
export default class Vts extends VtsStatic {
  constructor(form, config = {}) {
    super();
    const formElement = (this.form = Vts.getForm(form));
    if (formElement.vts instanceof Vts) {
      console.warn('Vts instance already exists: ', formElement.vts);
      return this;
    }

    this.fields = Vts.getFields(formElement);

    formElement.classList.add('vts');
    Object.assign(this, setVtsConfig(formElement, config));

    formElement.vts = this;
  }
}
