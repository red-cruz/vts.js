import Vts from '../src/Vts';
import type VtsConfig from '../src/types/config';
import type { DeepPartial } from '../src/types/helpers';

export default function createMockVts(
  form: HTMLFormElement | string = createMockForm(),
  config: DeepPartial<VtsConfig> = {}
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
  formConfig: FormConfig = {}
) {
  const form = document.createElement('form');

  // Create input elements
  Object.entries(inputs).forEach(([name, attributes]) => {
    const input = document.createElement('input');
    Object.entries(attributes).forEach(([attrName, attrValue]) => {
      input.setAttribute(attrName, attrValue);
    });
    input.setAttribute('name', name);
    form.append(input);
  });

  // Set form attributes from config
  Object.entries(formConfig).forEach(([attrName, attrValue]) => {
    form.setAttribute(attrName, attrValue);
  });

  return form;
}

// Interface for input attributes
interface InputAttributes {
  type?: string;
  value?: string;
}

interface FormConfig {
  method?: string; // e.g., 'post', 'get'
  action?: string; // URL of the form action
}
