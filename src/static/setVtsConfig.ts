import type VtsConfig from 'types/config';
import deepMerge from '../utils/deepMerge';
import vtsDefaults from '../defaults';

/**
 * Sets the configuration options for Vts (Validate Then Submit).
 * This function merges the provided configuration options with the default configuration
 * and returns the resulting configuration object.
 *
 * @param  form - The HTML form element.
 * @param config - The partial configuration options.
 * @returns - The merged configuration options.
 */
export default function setVtsConfig(form: HTMLFormElement, config: VtsConfig) {
  const options = deepMerge({}, vtsDefaults, config) as VtsConfig;
  const { ajax } = options;
  options.ajax.action = ajax.action || form.getAttribute('action') || '';

  const { request } = ajax;

  options.ajax.request = Object.assign(request, {
    method: request.method || form.getAttribute('method') || 'get',
  });

  return options;
}
