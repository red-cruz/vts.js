import Vts from '../vts';
import log from './log';
import getLabel from './getLabel';
import vtsDefaults from '../defaults';

export default class rulesUtil {
  /**
   * @description
   * @author RED
   * @static
   * @param {Vts} Vts
   * @returns {Array<invalidTitle, invalidMessage>}
   * @memberof rulesUtil
   */
  static apply() {
    /** @type {Vts} */
    const Vts = this;
    const form = Vts.form;
    const field = Vts.currentField;
    const rule = Vts.config.rules[field.name];
    const label = getLabel(form, field);
    let title = 'Invalid ' + label;
    let message = null;
    // check if field has rule
    if (rule) {
      title = rule.title ?? title;
      let pattern = rule.pattern;
      [message = message, pattern = pattern] = rulesUtil.#matchField.call(
        Vts,
        rule
      );
      const regExp = new RegExp(pattern, rule.flags);
      const source = regExp.source;

      field.value.match(regExp);
      field.setAttribute('pattern', source);
      log.show(Vts.config.log, 'log', 'pattern:', source);
    }
    return [label, title, message];
  }
  /**
   * @description
   * @static
   * @param {Vts} Vts
   * @param {String} matchFieldName name of the field to match
   * @returns {Array<invalidMessage, valid>}
   * @memberof rulesUtil
   */
  static #matchField(rule) {
    const matchFieldName = rule.match;

    if (!matchFieldName) return [];
    /** @type {Vts} */
    const Vts = this;
    const form = Vts.form;
    const formData = Vts.formData;
    const field = Vts.currentField;
    const matchTarget = form.querySelector('[name="' + matchFieldName + '"]');
    const defMismatchMsg =
      getLabel(form, field) + ' did not match ' + getLabel(form, matchTarget);
    /** @type {String} */
    const invalidMessage = rule.message || defMismatchMsg;
    const flags = rule.flags;
    const rawValue = formData.get(matchFieldName);
    const value = flags.includes('i')
      ? vtsDefaults.generateCaseCombinations(rawValue, flags)
      : rawValue;

    return [invalidMessage, value];
  }
}
