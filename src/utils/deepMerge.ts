/**
 * Deeply merges multiple objects into a single object.
 *
 * @param target - The target object to merge the sources into.
 * @param sources - The source objects to merge into the target.
 * @returns The merged object.
 */
export default function deepMerge(target: object, ...sources: object[]): object {
  if (!sources.length) {
    return target;
  }

  const source = sources.shift();

  for (const key in source) {
    if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
      if (source[key] instanceof RegExp || source[key] instanceof Date) {
        target[key] = source[key];
        continue;
      }
      if (!target[key] || typeof target[key] !== 'object' || Array.isArray(target[key])) {
        target[key] = {};
      }

      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return deepMerge(target, ...sources);
}
