'use strict';
import Check from './utils/static/Check.js';
import _ from 'lodash';
import LogUtil from './utils/Log.js';
import vtsEvents from './mixins/Events.js';
import vtsRules from './mixins/Rules.js';
import vtsValidation from './mixins/Validation.js';
import setVtsConfig from './utils/static/setVtsConfig.js';

/**
 * A JavaScript library that provides a simple and flexible way to handle
 * form validation before submitting. It allows you to customize the validation rules,
 * error messages, and actions to be performed when a form field is valid or invalid.
 *
 * @author RED
 * @class Vts
 */
export default class Vts {
  /**
   * Creates an instance of Vts.
   * @param {String} formId
   * @memberof ValidateThenSubmit
   */
  constructor(formId, config = {}) {
    const form = document.getElementById(formId);
    const abortController = (this.abortController = new AbortController());
    this.config = setVtsConfig(form, config, abortController);
    /** @type {NodeListOf<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>}*/
    this.fields = form.querySelectorAll('[name]:not([data-vts-ignored])');
    this.form = form;
    Object.assign(Vts.prototype, vtsEvents, vtsRules, vtsValidation);
    this.#init();
  }

  #init() {
    const form = this.form;
    Check.instance(form.id);
    Check.form(form);
    this._convertRulesToMap();
    this._addEventListeners();
  }
}
