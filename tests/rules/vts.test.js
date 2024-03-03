import Vts from '../../src/Vts';
import createMockVts from '../helpers';
expect.extend({
  toBeFunction(received) {
    return {
      pass: typeof received === 'function',
      message: () => `Expected value to be a function`,
    };
  },
});

describe('Vts initialization and rule gathering', () => {
  /** @type {Vts} */
  let vts;

  beforeEach(() => (vts = createMockVts()));

  it('should create Vts instance', () => {
    expect(vts.form.vts).toBeInstanceOf(Vts);
  });

  it('should have vts class', () => {
    const hasVtsClass = vts.form.classList.contains('vts');
    expect(hasVtsClass).toBe(true);
  });

  it('should create a Map object for rules after initialization', () => {
    expect(vts.rules).toBeInstanceOf(Map);
  });
});
