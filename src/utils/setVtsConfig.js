// @ts-check
/// <reference path="../ValidateThenSubmit.d.ts" />
import _ from 'lodash';
import { vtsDefaults } from './Defaults';

export default function setVtsConfig(form, config, abortController) {
  const options = _.merge({}, vtsDefaults, config);
  const ajax = options.ajax;
  options.ajax.action = ajax.action || form.action;
  options.ajax.method = ajax.method || form.method;
  const rawRequest = _.merge(
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
