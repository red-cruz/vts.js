import Vts from '../src/vts';
import type VtsConfig from '../types/config';
import { type VtsField } from '../types/helpers';

export default function createMockVts(
  form: HTMLFormElement | string = createMockForm(),
  config: VtsConfig = {},
) {
  return new Vts(form, config);
}

/**
 * Creates a mock form element with optional input elements.
 *
 * @param inputs An object defining the input elements to be added to the form.
 * @returns A mock form element with the specified inputs.
 *
 * @example
 * const mockForm = createMockForm({
 *   name: { type: 'text', value: 'John Doe' },
 *   email: { type: 'email', required: true },
 * });
 */
export function createMockForm(
  inputs: Record<string, InputAttributes> = {},
  formConfig: FormConfig = {},
) {
  const form = document.createElement('form');

  // Create input elements
  createVtsFields(inputs).forEach((input) => form.append(input));

  // Set form attributes from config
  Object.entries(formConfig).forEach(([attrName, attrValue]) => {
    form.setAttribute(attrName, attrValue);
  });
  document.body.append(form);
  return form;
}

export function createVtsFields(inputs: Record<string, InputAttributes>): VtsField[] {
  const inputElements: VtsField[] = [];

  Object.entries(inputs).forEach(([name, attributes]) => {
    const input = document.createElement('input');

    Object.entries(attributes).forEach(([attrName, attrValue]) => {
      input.setAttribute(attrName, attrValue);
    });

    input.setAttribute('name', name);
    inputElements.push(input);
  });

  return inputElements;
}

// Interface for input attributes
interface InputAttributes {
  type?: string;
  value?: string;
  id?: string;
  'data-vts-ignored'?: string;
  form?: string;
}

interface FormConfig {
  id?: string;
  method?: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';
  action?: string; // URL of the form action
}

// expect.extend({
//   toBeFunction(received) {
//     return {
//       pass: typeof received === 'function',
//       message: () => `Expected value to be a function`,
//     };
//   },
// });
