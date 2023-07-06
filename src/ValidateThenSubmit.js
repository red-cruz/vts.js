import Check from './utils/Check.js';
import _ from 'lodash';
import vtsEvents from './mixins/Events.js';
import vtsRules from './mixins/Rules.js';
import vtsValidation from './mixins/Validation.js';
import setVtsConfig from './utils/setVtsConfig.js';
import vtsForm from './mixins/Form.js';

export { setVtsDefaults } from './utils/Defaults.js';
/**
 * A JavaScript library that provides a simple and flexible way to handle
 * form validation before submitting. It allows you to customize the validation rules,
 * error messages, and actions to be performed when a form field is valid or invalid.
 *
 * @author RED
 * @class ValidateThenSubmit
 */
export default class ValidateThenSubmit {
  constructor(formId, config = {}) {
    const form = document.getElementById(formId);
    const abortController = (this.abortController = new AbortController());
    this.config = setVtsConfig(form, config, abortController);
    /** @type {NodeListOf<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>}*/
    this.fields = form.querySelectorAll('[name]:not([data-vts-ignored])');
    this.form = form;
    this.#init();
  }

  #init() {
    this.#mixin();
    const form = this.form;
    Check.instance(form.id);
    Check.form(form);
    this._convertRulesToMap();
    this._addEventListeners();
  }

  #mixin() {
    Object.assign(
      ValidateThenSubmit.prototype,
      vtsEvents,
      vtsRules,
      vtsValidation
    );
    Object.assign(this, vtsForm);
  }
}
