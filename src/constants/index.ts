export const VERSION = '1.11.0';

const ignoredTypes = ['submit', 'reset', 'button', 'hidden']
  .map((type) => `:not([type="${type}"])`)
  .join('');
export const FORM_FIELD_QUERY = '[name]:not([data-vts-ignored])' + ignoredTypes;
export const DOC_FIELD_QUERY = `[name][form="{:formId}"]:not([data-vts-ignored])${ignoredTypes}`;
export const FIELD_QUERY = `${FORM_FIELD_QUERY}, ${DOC_FIELD_QUERY}`;
