import { FIELD_QUERY, FORM_FIELD_QUERY, VERSION } from 'constants/index';
import ValidatorStatic from './validator';
import type { VtsField } from 'types/helpers';
import deepMerge from 'utils/deepMerge';
import vtsDefaults from 'defaults/index';
import type VtsConfig from 'types/config';

export default abstract class VtsStatic extends ValidatorStatic {
  static readonly version: string = VERSION;

  static setDefaults(config: VtsConfig): void {
    deepMerge(vtsDefaults, config);
  }

  static getFields(form: HTMLFormElement): NodeListOf<VtsField> {
    if (form.id) {
      const selectors = `form#${form.id} ${FIELD_QUERY.replace(/{:formId}/g, form.id)}`;
      return document.querySelectorAll(selectors);
    }

    return form.querySelectorAll(FORM_FIELD_QUERY);
  }

  static getFieldGroup(field: VtsField): Array<VtsField | Element> {
    const form = field.closest('form');
    const fields = form?.querySelectorAll(FIELD_QUERY);

    if (!form || !fields) return [];

    const fieldName = field.name;

    if (!/\[.*\]/.test(field.name)) {
      // Find all matching inputs
      const groupedFields: Array<VtsField | Element> = [];

      for (const gField of fields) {
        const hasName = 'name' in gField;
        if (hasName && typeof gField.name === 'string')
          fieldName === gField.name && groupedFields.push(gField);
      }

      return groupedFields;
    }

    // Build regular expression
    const [baseName] = fieldName.split('[');
    const dynamicParts = fieldName
      .split(']')
      .slice(1)
      .map((part) => part.split('[')[1]);
    let regexPattern = `^${baseName}`;

    if (dynamicParts.length > 0) {
      regexPattern += `(\\[${dynamicParts.join('|')}\\])?`;
    }

    const groupRegex = new RegExp(regexPattern);

    // Find all matching inputs
    const groupedFields: Array<VtsField | Element> = [];

    for (const gField of fields) {
      const hasName = 'name' in gField;
      if (hasName && typeof gField.name === 'string')
        groupRegex.test(gField.name) && groupedFields.push(gField);
    }

    return groupedFields;
  }
}

function base<T>() {
  class Base {
    static prop: T;
  }
  return Base;
}

function derived<T>() {
  class Derived extends base<T>() {
    static anotherProp: T;
  }
  return Derived;
}

class Spec extends derived<string>() {}

Spec.prop; // string
Spec.anotherProp; // string
