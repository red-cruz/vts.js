/**
 * @description Deeply merges multiple objects.
 * @author RED
 * @export
 * @param {Object} target - The target object to merge into.
 * @param {Array} sources - The source objects to merge.
 * @returns {Object} The merged object.
 */
export default function deepMerge(target, ...sources) {
  if (!sources.length) {
    return target;
  }

  const source = sources.shift();

  for (const key in source) {
    if (
      typeof source[key] === 'object' &&
      source[key] !== null &&
      !Array.isArray(source[key])
    ) {
      if (
        !target[key] ||
        typeof target[key] !== 'object' ||
        Array.isArray(target[key])
      ) {
        target[key] = {};
      }

      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return deepMerge(target, ...sources);
}
