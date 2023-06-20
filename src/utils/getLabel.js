/**
 * @description Retrieves the label for the specified field.
 * @author RED
 * @export
 * @param {HTMLFormElement} form
 * @param {HTMLElement} field
 * @returns {String}
 */
export default function getLabel(form, field) {
  const data_label = field.dataset.vtsLabel;
  const label_node = form.querySelector('label[for="' + field.id + '"]');
  const label_text = label_node ? label_node.textContent : null;
  const placeholder = field.getAttribute('placeholder');
  const label = data_label || label_text || placeholder || '';
  return label;
}
