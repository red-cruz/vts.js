export function deepMerge(target, ...sources) {
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
