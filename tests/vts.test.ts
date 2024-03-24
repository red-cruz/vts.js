import Vts from '../src/vts';
import createMockVts, { createMockForm, createVtsFields } from './helpers';

describe('idk', () => {
  createVtsFields({
    outside: {
      value: '1111',
      form: 'test-form',
      id: 'vvf',
      type: 'text',
    },
  }).forEach((field) => document.body.append(field));

  const vts: Vts = createMockVts(
    createMockForm(
      {
        test: {
          value: 'op',
        },
      },
      {
        id: 'test-form',
      },
    ),
  );

  it('should have 2 inputs', () => {
    expect(vts.fields.length).toBe(2);
  });
});
