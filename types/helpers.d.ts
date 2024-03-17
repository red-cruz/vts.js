import type Vts from '.';

export type VtsField = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? T[P] extends () => any //Function
      ? T[P]
      : RecursivePartial<T[P]>
    : T[P];
};

declare global {
  interface HTMLFormElement {
    vts?: Vts;
  }
}
