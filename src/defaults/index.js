// @ts-check
'use strict';
import ajaxHandler from './ajax';
import vtsHandlers from './handler';
/**
 * Global default configuration for Vts (Validate Then Submit).
 *
 * @type {import('../Vts').VtsConfig}
 */
const vtsDefaults = {
  ajax: ajaxHandler,
  class: {
    form: 'was-validated',
    invalid: 'invalid-feedback',
    valid: 'valid-feedback',
  },
  halt: false,
  handlers: vtsHandlers,
  listen: false,
  message: {
    invalid: 'Invalid ${label}',
    valid: '',
  },
  rules: {},
  stopPropagation: true,
};

export default vtsDefaults;