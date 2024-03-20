import type VtsConfig from 'types/config';
import ajaxHandler from './ajax';
import defaultMsg from './defaultMsg';
import renderFeedback from './renderFeedback';

export const restoreableConfig: VtsConfig = {
  ajax: ajaxHandler,
  class: {
    form: 'vts-form-was-validated',
    invalid: 'vts-invalid-field',
    valid: 'vts-valid-field',
    wrapper: '',
    fieldWrapper: 'vts-field-was-validated',
  },
  shouldSubmit: true,
  renderFeedback,
  validateOnSumbit: false,
  messages: defaultMsg,
  onSubmit() {},
  rules: {},
  stopPropagation: true,
};

/**
 * Global default configuration for Vts
 */
const vtsDefaults: VtsConfig = { ...restoreableConfig };

export default vtsDefaults;
