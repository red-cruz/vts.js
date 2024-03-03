import Vts from '../../src/Vts';

describe('Class Config', () => {
  let form;
  /** @type {Vts} */
  let vts;

  beforeEach(() => {
    form = form = document.createElement('form');
    const passwordInput = document.createElement('input');
    passwordInput.name = 'password';
    form.appendChild(passwordInput);

    vts = new Vts(form, {
      rules: {
        password: {
          equalTo: 'TestPassword12',
        },
      },
    });
  });
});

test('vts.ajax should be an object', () => {
  expect(vtsDefaults.ajax).toBeInstanceOf(Object);
});

test('vts.ajax should have request and beforeSend properties', () => {
  expect(vtsDefaults.ajax).toHaveProperty('request');
  expect(vtsDefaults.ajax).toHaveProperty('beforeSend');
  // Add similar tests for other properties like complete, error, and success if applicable
});
