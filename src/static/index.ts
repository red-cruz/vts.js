import { FIELD_QUERY, VERSION } from 'constants/index';
import AjaxStatic from './ajax';
import type VtsConfig from 'types/config';
import type { VtsField } from 'types/helpers';
import deepMerge from 'src/utils/deepMerge';
import getResponseData from './getResponseData';
import vtsDefaults from 'defaults/index';

export default abstract class VtsStatic extends AjaxStatic {
  static version: string = VERSION;

  static async getResponseData(response: Response): Promise<any> {
    const data = await getResponseData(response);
    return data;
  }

  static setDefaults(config: VtsConfig): void {
    deepMerge(vtsDefaults, config);
  }

  static getGroupedFields(field: VtsField): Array<VtsField | Element> {
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
