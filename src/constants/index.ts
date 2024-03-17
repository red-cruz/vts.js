export const VERSION = '1.11.0';

const ignoredTypes = ['submit', 'reset', 'button', 'hidden']
  .map((type) => `:not([type="${type}"])`)
  .join('');

export const FIELD_QUERY = '[name]:not([data-vts-ignored])' + ignoredTypes;
