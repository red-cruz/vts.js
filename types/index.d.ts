import type VtsConfig from './config';

// Type definitions for Vts.js 1.11
export = Vts;

/**
 * A JavaScript library that provides a simple and flexible way to handle
 * form validation before submitting. It allows you to customize the validation rules,
 * error messages, and actions to be performed when a form field is valid or invalid.
 *
 * @author RED
 * @version 1.10.3-beta
 */
declare class Vts {
  constructor(form: string | HTMLFormElement, config?: VtsConfig);
}
