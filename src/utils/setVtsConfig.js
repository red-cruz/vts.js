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
 * @param {Partial<import('../vts').VtsConfig>} config - The partial configuration options.
 * @returns {import('../vts').VtsConfig} - The merged configuration options.
 */
export default function setVtsConfig(form, config) {
  /** @type {import('../types/config').VtsConfig} */
  const options = deepMerge({}, vtsDefaults, config);

  /** @type {Partial<import('../types/config').VtsAjaxSettings>} */
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
