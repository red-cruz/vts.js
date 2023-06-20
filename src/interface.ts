export interface InvalidFormElement {
  name: string;
  value: string;
  type: string;
  validity: {
    valid: boolean;
    badInput: boolean;
    patternMismatch: boolean;
    valueMissing: boolean;
  };
}

interface Vts {}
