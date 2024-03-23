import Vts from '../src/vts';
import createMockVts, { createMockForm, createVtsFields } from './helpers';

// expect.extend({
//   toBeFunction(received) {
//     return {
//       pass: typeof received === 'function',
//       message: () => `Expected value to be a function`,
//     };
//   },
// });

// describe('Vts initialization and rule gathering', () => {
//   let vts: Vts;
//   Vts.version;
//   beforeEach(() => (vts = createMockVts()));

//   it('should create Vts instance', () => {
//     expect(vts.form.vts).toBeInstanceOf(Vts);
//   });

//   it('should have vts class', () => {
//     const hasVtsClass = vts.form.classList.contains('vts');
//     expect(hasVtsClass).toBe(true);
//   });

//   it('should create a Map object for rules after initialization', () => {
//     expect(vts.rules).toBeInstanceOf(Map);
//   });
// });

describe('Ewan', () => {
  createVtsFields({
    outside: {
      value: '1111',
      form: 'test-form',
      id: 'vvf',
      type: 'text',
    },
  }).forEach((field) => document.body.append(field));

  const vts: Vts = createMockVts(
    createMockForm({
      test: {
        value: 'op',
      },
    }),
  );

  it('should have 2 inputs', () => {
    expect(vts.fields.length).toBe(2);
  });
});
