// @ts-check
import { vtsDefaults } from './Defaults';
import { deepMerge } from './deepMerge';

/**
 * @description
 * @author RED
 * @export
 * @param {HTMLFormElement} form
 * @param {Partial<import('../ValidateThenSubmit').VtsConfig>} config
 * @param {AbortController} abortController
 * @returns {import('../ValidateThenSubmit').VtsConfig}
 */
export default function setVtsConfig(form, config, abortController) {
  const options = deepMerge({}, vtsDefaults, config);
  const ajax = options.ajax;
  options.ajax.action = ajax.action || form.action;
  options.ajax.method = ajax.method || form.method;
  const rawRequest = deepMerge(
    {
      request: {
        'Content-Type': 'multipart/form-data',
      },
    },
    ajax.request
  );
  const signal = abortController.signal;
  options.ajax.request = { ...rawRequest, signal };
  return options;
}
