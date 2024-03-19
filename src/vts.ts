// import type { VtsCore } from 'types/instance';
import type { VtsField } from 'types/helpers';
import { FIELD_QUERY } from './constants';
import VtsStatic from './static';
import setVtsConfig from 'instance/setVtsConfig';
import type VtsConfig from 'types/config';

export default class Vts extends VtsStatic {
  form: HTMLFormElement;
  fields: NodeListOf<VtsField>;
  constructor(form: string | HTMLFormElement, config?: VtsConfig) {
    super();
    const formElement = (this.form = Vts.getForm(form));
    if (formElement.vts instanceof Vts) {
      console.warn('Vts instance already exists: ', formElement.vts);
    } else {
      this.fields = formElement.querySelectorAll(FIELD_QUERY);
      formElement.vts = this;
      formElement.classList.add('vts');
      Object.assign(this, setVtsConfig(formElement, config));
      // Object.assign(this, vtsForm, setVtsConfig(formElement, config));
      // Object.assign(Vts.prototype, vtsEvents, vtsRules, vtsValidation);
      // this._convertRulesToMap();
      // this._setFieldAttributes();
      // this._addEventListeners();
    }
  }
}
