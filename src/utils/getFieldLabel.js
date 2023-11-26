// @ts-check
/**
 * Retrieves the label for the specified field within the given form.
 *
 * @param {string|undefined} ruleLabel
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field - The field element for which to retrieve the label.
 * @param {HTMLFormElement} form - The form element containing the field.
 * @returns {string} - The label text.
 */
export default function getFieldLabel(ruleLabel, field, form) {
  const labelElement = form.querySelector(`label[for="${field.id}"]`);
  const labelText = labelElement?.textContent;
  const placeholder = field.getAttribute('placeholder');
  const name = field.getAttribute('name') || field.name;
  const label =
    ruleLabel ||
    labelText ||
    placeholder ||
    name.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ' ');

  return label;
}
