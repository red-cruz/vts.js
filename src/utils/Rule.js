import Vts from '../vts';
import Log from './Log';
import { getFieldLabel } from './static/getters';

export default class RuleUtil {
  /**
   * @description
   * @author RED
   * @static
   * @this {Vts} Vts
   * @returns {Array<invalidTitle, invalidMessage>}
   * @memberof RulesUtil
   */
  static apply() {
    const form = this.form;
    const field = this.currentField;
    const rule = this.config.rules[field.name];
    const label = getFieldLabel(field, form);
    let invalidTitle = 'Invalid ' + label;
    let invalidMessage = field.validationMessage;
    let valid = field.checkValidity();

    // check if field has rule
    if (rule) {
      invalidMessage = rule.invalid?.title || invalidTitle;
      let pattern = rule.pattern;

      [valid = valid, invalidMessage = invalidMessage, pattern = pattern] =
        RuleUtil.#matchField.call(this, rule);

      const regExp = new RegExp(pattern, rule.flags);
      const source = regExp.source;

      if (regExp.test(field.value)) valid = true;
      Log.show(this.config.log, 'log', 'pattern:', source);
    }
    return [valid, label, invalidTitle, invalidMessage];
  }

  /**
   * @description
   * @static
   * @param {Vts} Vts
   * @param {String} matchFieldName name of the field to match
   * @returns {[string, boolean]|[]}
   * @memberof RulesUtil
   */
  static #matchField(rule) {
    const matchFieldName = rule.match;

    if (!matchFieldName) return [];

    /** @type {Vts} */
    const Vts = this;
    const form = Vts.form;
    const field = Vts.currentField;
    const matchTarget = form.querySelector('[name="' + matchFieldName + '"]');
    const defMismatchMsg =
      getFieldLabel(field, form) +
      ' did not match ' +
      getFieldLabel(matchTarget, form);
    /** @type {String} */
    const invalidRuleMessage = rule.invalid?.message.replace(
      '${value}',
      field.value
    );

    /** @type {String} */
    const invalidMessage = invalidRuleMessage || defMismatchMsg;
    const rawValue = matchTarget.value;
    return [invalidMessage, rawValue];
  }
}
