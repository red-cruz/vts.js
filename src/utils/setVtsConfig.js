// @ts-check
import vtsDefaults from '../defaults';
import deepMerge from './deepMerge';

/**
 * Sets the configuration options for Vts (Validate Then Submit).
 *
 * @description This function merges the provided configuration options with the default configuration
 * and returns the resulting configuration object.
 *
 * @export
 * @param {HTMLFormElement} form - The HTML form element.
 * @param {import('../types/config').default} config - The partial configuration options.
 * @returns {import('../types/config').default} - The merged configuration options.
 */
export default function setVtsConfig(form, config) {
  /** @type {import('../types/config').default} */
  const options = deepMerge({}, vtsDefaults, config);

  const ajax = options.ajax;
  options.ajax.action = ajax.action || form.getAttribute('action') || '';

  const request = ajax.request;
  /** @type {RequestInit} */
  const method = {
    method: request.method || form.getAttribute('method') || 'get',
  };

  /** @type {RequestInit} */
  const merge = Object.assign(request, method);
  options.ajax.request = merge;

  return options;
}
