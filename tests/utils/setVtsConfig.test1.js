jest.mock('../../src/utils/deepMerge'); // Mock deepMerge for testing purposes

import vtsDefaults from '../../src/defaults';
import setVtsConfig from '../../src/static/setVtsConfig';

describe('setVtsConfig', () => {
  let form;
  let config;

  beforeEach(() => {
    form = document.createElement('form');
    form.setAttribute('action', '/submit');
    form.setAttribute('method', 'post');

    config = {};
  });

  it('should merge default and provided configuration', () => {
    const mergedConfig = setVtsConfig(form, config);

    expect(mergedConfig).toEqual(expect.objectContaining(vtsDefaults));
    expect(mergedConfig).toEqual(expect.objectContaining(config));

    // Alternatively, use deep comparison library if needed
    // expect(mergedConfig).toEqual(deepMerge({}, vtsDefaults, config));
  });

  it('should set ajax action from form attribute if not provided', () => {
    const mergedConfig = setVtsConfig(form, config);

    expect(mergedConfig.ajax.action).toBe('/submit');
  });

  it('should set ajax request method from form attribute if not provided', () => {
    const mergedConfig = setVtsConfig(form, config);

    expect(mergedConfig.ajax.request.method).toBe('post');
  });

  it('should merge request options with method from form attribute', () => {
    config.ajax = {
      request: { headers: { 'Content-Type': 'application/json' } },
    };
    const mergedConfig = setVtsConfig(form, config);

    expect(mergedConfig.ajax.request).toEqual({
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
    });
  });
});
