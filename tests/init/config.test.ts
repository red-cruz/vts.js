import Vts from '../../src/vts';
import deepMerge from '../../src/utils/deepMerge';

jest.mock('../../src/utils/deepMerge', () => jest.fn());

describe('Configuration mixin', () => {
  it('should merge defaults and configuration correctly', () => {
    const mockForm = document.createElement('form');
    mockForm.action = 'https://example.com/submit';
    mockForm.method = 'POST';

    const mockConfig = {
      ajax: {
        request: {
          method: 'PUT',
        },
      },
    };

    const mockDeepMerge = deepMerge as jest.MockedFunction<typeof deepMerge>;
    mockDeepMerge.mockReturnValue({
      ajax: {
        action: 'https://example.com/submit',
        request: {
          method: 'PUT',
        },
      },
    });

    const vts = new Vts(mockForm, mockConfig);

    expect(mockDeepMerge).toHaveBeenCalledWith({}, expect.anything(), mockConfig);
    expect(vts.ajax.action).toBe('https://example.com/submit');
    expect(vts.ajax.request.method).toBe('PUT');
  });
});
