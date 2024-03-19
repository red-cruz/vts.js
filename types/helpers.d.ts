export type VtsField = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? T[P] extends (...args: any[]) => any
      ? T[P]
      : RecursivePartial<T[P]>
    : T[P];
};
