// @ts-check
import vtsDefaults from './defaults';
import deepMerge from './deepMerge';

/**
 * Sets the configuration options for Vts (Validate Then Submit).
 *
 * @description This function merges the provided configuration options with the default configuration
 * and returns the resulting configuration object.
 *
 * @export
 * @param {HTMLFormElement} form - The HTML form element.
 * @param {Partial<import('../ValidateThenSubmit').VtsConfig>} config - The partial configuration options.
 * @returns {import('../ValidateThenSubmit').VtsConfig} - The merged configuration options.
 */
export default function setVtsConfig(form, config) {
  // Merge the default configuration with the provided configuration
  const options = deepMerge({}, vtsDefaults, config);

  // Set the form action and method in the Ajax settings
  const ajax = options.ajax;
  options.ajax.action = ajax.action || form.action;
  options.ajax.method = ajax.method || form.method;
  const abortController = new AbortController();
  // Merge the raw request options with the Ajax request options
  options.ajax.request = deepMerge(
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      signal: abortController.signal,
    },
    ajax.request
  );
  // const signal = abortController.signal;
  // options.ajax.request = { ...rawRequest, signal };

  // Return the merged configuration options
  return options;
}
