// @ts-check
'use strict';
import ajaxHandler from './ajax';
import handler from './handler';
import defaultMsg from './defaultMsg';
/**
 * Global default configuration for Vts (Validate Then Submit).
 *
 * @type {import('../types/base/config').default}
 */
const vtsDefaults = {
  ajax: ajaxHandler,
  class: {
    form: 'was-validated',
    invalid: 'invalid-feedback',
    valid: 'valid-feedback',
  },
  halt: false,
  handler,
  listen: false,
  message: defaultMsg,
  rules: {},
  stopPropagation: true,
};

export default vtsDefaults;
