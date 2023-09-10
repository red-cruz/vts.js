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
 * @param {import('../types/base/config').default} config - The partial configuration options.
 * @returns {import('../types/base/config').default} - The merged configuration options.
 */
export default function setVtsConfig(form, config) {
  /** @type {import('../types/base/config').default} */
  const options = deepMerge({}, vtsDefaults, config);

  const ajax = options.ajax;
  options.ajax.action = ajax.action || form.action;

  const req = ajax.request;
  /** @type {RequestInit} */
  const request = {
    method: req?.method || form.method || 'get',
  };

  /** @type {RequestInit} */
  const merge = deepMerge(req, request);
  options.ajax.request = merge;

  return options;
}
