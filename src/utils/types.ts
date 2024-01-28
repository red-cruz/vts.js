export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Helper type to extract keys from an object type
 */
export type KeysOfType<T> = keyof T;
