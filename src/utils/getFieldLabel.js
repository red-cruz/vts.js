import Vts from '../ValidateThenSubmit';

/**
 * Retrieves the label for the specified field within the given form.
 *
 * @param {HTMLElement} field - The field element for which to retrieve the label.
 * @param {HTMLFormElement} form - The form element containing the field.
 * @returns {string} - The label text.
 */
export default function getFieldLabel(field, form) {
  const dataLabel = field.dataset.vtsLabel;
  const labelElement = form.querySelector(`label[for="${field.id}"]`);
  const labelText = labelElement?.textContent;
  const placeholder = field.getAttribute('placeholder');
  const label = dataLabel || labelText || placeholder || '';
  return label;
}
