import Vts from '../../src/vts';
import ajaxHandler from '../../src/defaults/ajax';
import vtsDefaults from '../../src/defaults';
import renderFeedback from '../../src/defaults/renderFeedback';
import defaultMsg from '../../src/defaults/defaultMsg';
import AjaxSettings from '../../types/config/AjaxSettings';

describe('Defaults', () => {
  it('should have the correct default configuration', () => {
    const form = document.createElement('form');
    form.action = 'https://example.com';
    const vts = new Vts(form);
    const defaultAjax: AjaxSettings = {
      ...ajaxHandler,
      ...{
        action: form.action,
        request: {
          method: 'POST',
        },
      },
    };
    expect(vts.ajax).toEqual(defaultAjax);
    expect(vts.class).toEqual(vtsDefaults.class);
    expect(vts.shouldSubmit).toBe(vtsDefaults.shouldSubmit);
    expect(vts.renderFeedback).toBe(renderFeedback);
    expect(vts.validateOnSumbit).toBe(vtsDefaults.validateOnSumbit);
    expect(vts.messages).toEqual(defaultMsg);
    expect(vts.onSubmit).toEqual(vtsDefaults.onSubmit);
    expect(vts.rules).toEqual(vtsDefaults.rules);
    expect(vts.stopPropagation).toBe(vtsDefaults.stopPropagation);
  });
});
