import Vts from '../Vts';

/**
 * Retrieves the common parent of a field.
 * @param {HTMLElement} field
 * */
export default function (field) {
  const fields = Vts.getGroupedFields(field);

  if (!fields || !fields.length) {
    return null; // Handle empty input or invalid type
  }

  // Find the deepest common ancestor element that contains all fields
  let commonParent = fields[0].parentElement;
  for (let i = 1; i < fields.length; i++) {
    while (!commonParent?.contains(fields[i])) {
      commonParent = commonParent?.parentElement ?? null;
      if (!commonParent) {
        return null; // No common parent found
      }
    }
  }

  return commonParent;
}
