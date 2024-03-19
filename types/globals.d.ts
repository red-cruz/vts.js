import Vts from '.';

declare global {
  interface HTMLFormElement {
    vts?: Vts;
  }
}
