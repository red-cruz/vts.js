// @ts-check
/**
 * Retrieves the label for the specified field within the given form.
 *
 * @param {import("../types/config/rules").Rule|undefined} ruleLabel
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field - The field element for which to retrieve the label.
 * @param {HTMLFormElement} form - The form element containing the field.
 * @returns {Promise<string>} - The label text.
 */
export default async function getFieldLabel(ruleLabel, field, form) {
  const labelElement = form.querySelector(`label[for="${field.id}"]`);
  const labelText = labelElement?.textContent;
  const placeholder = field.getAttribute('placeholder');
  const name = field.name;

  const defaultLabel =
    labelText ||
    placeholder ||
    name.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ' ');

  if (typeof ruleLabel === 'function') {
    field.setCustomValidity('checking...');
    this.renderFeedback.call(
      field,
      { checking: 'checking...' },
      this.class.invalid
    );
    const label = await ruleLabel(field, defaultLabel);
    return label;
  } else {
    const label = ruleLabel || defaultLabel;
    return label;
  }
}
