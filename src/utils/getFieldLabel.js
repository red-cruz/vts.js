// @ts-check
/**
 * Retrieves the label for the specified field within the given form.
 *
 * @param {import("../types/config/rules").Rule|undefined} label
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field - The field element for which to retrieve the label.
 * @param {HTMLFormElement} form - The form element containing the field.
 */
export default async function getFieldLabel(label, field, form) {
  const labelElement = form.querySelector(`label[for="${field.id}"]`);
  const labelText = labelElement?.textContent;
  const placeholder = field.getAttribute('placeholder');
  const name = field.name;
  const defaultLabel =
    labelText ||
    placeholder ||
    name.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ' ');
  return label || defaultLabel;
}
