import Vts from '../../src/Vts';
import { describe, expect, it, test } from '@jest/globals';

describe('Vts initialization and rule gathering', () => {
  let form;
  /** @type {Vts} */
  let vts;

  beforeEach(() => {
    form = document.createElement('form');
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

  it('should create Vts instance', () => {
    expect(vts.form.vts).toBeInstanceOf(Vts);
  });

  it('should create a Map object for rules after initialization', () => {
    expect(vts.rules).toBeInstanceOf(Map);
  });

  it('should gather the correct rules for the password field', () => {
    const passwordRules = vts.rules.get('password');
    expect(passwordRules).toHaveProperty('equalTo', 'TestPassword12');
  });

  // Additional suggestion: Test for correct field validation
  // it('should correctly validate the password field', () => {
  //   const passwordInput = form.querySelector('input[name="password"]');
  //   passwordInput.value = 'TestPassword12';

  //   // Trigger validation (assuming it's triggered on change)
  //   passwordInput.dispatchEvent(new Event('change'));

  //   // Jest assertions for validation
  //   expect(vts.validate).toHaveBeenCalledWith(passwordInput, {
  //     equalTo: 'TestPassword12',
  //   });

  //   // Assert validation result (this depends on your validation logic)
  //   expect(vts.isValid).toBe(true); // Assuming validation passes
  // });
});
