import type { VtsField } from 'types/helpers';

export default abstract class ValidatorStatic {
  static getForm(form: string | HTMLFormElement): HTMLFormElement {
    let $form: HTMLElement;
    if (typeof form === 'string') {
      $form = document.getElementById(form);
      // Check if form element exists
      if (!$form) {
        throw new TypeError(`The form element with ID "${form}" was not found.`);
      }
    } else $form = form;

    return checkHTMLFormInstance($form);
  }

  static getField(name: string, form: HTMLFormElement): VtsField {
    // remove possible date modifier
    const [fieldName] = name.split(' ');
    const field = form.querySelector(`[name="${fieldName}"]`);

    // Check if element is a valid vts field
    if (
      !(
        field instanceof HTMLInputElement ||
        field instanceof HTMLSelectElement ||
        field instanceof HTMLTextAreaElement
      )
    ) {
      throw `${name} is not a valid vts field.`;
    }

    return field;
  }
}

function checkHTMLFormInstance(element: HTMLElement): HTMLFormElement {
  if (!(element instanceof HTMLFormElement)) {
    const formId = element?.getAttribute('id');
    const msg = (formId ? `with ID "${formId}"` : `"${element?.tagName}"`) || element;

    throw new TypeError(`The element ${msg} is not a valid HTML form element.`);
  }
  element.noValidate = true;

  return element;
}
