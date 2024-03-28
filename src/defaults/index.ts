import ajaxHandler from './ajax';
import defaultMsg from './defaultMsg';
import renderFeedback from './renderFeedback';
import type { RecursivePartial } from 'types/helpers';
import type { CoreConfig } from 'types/config';

export const restorableConfig: RecursivePartial<CoreConfig> = {
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
  validateOnSubmit: false,
  messages: defaultMsg,
  onSubmit() {},
  rules: {},
  stopPropagation: true,
};

/**
 * Global default configuration for Vts
 */
const vtsDefaults: RecursivePartial<CoreConfig> = { ...restorableConfig };

export default vtsDefaults;
