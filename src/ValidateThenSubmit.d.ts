/**
 * A JavaScript library that provides a simple and flexible way to handle
 * form validation before submitting. It allows you to customize the validation rules,
 * error messages, and actions to be performed when a form field is valid or invalid.
 *
 * @author RED
 */
declare module 'ValidateThenSubmit' {
  type VtsAjaxRequest = {
    action?: string;
    method?: string;
  };

  type VtsAjaxSettings = {
    request: VtsAjaxRequest;
    beforeSend?: (
      abortController: AbortController,
      form: HTMLFormElement
    ) => void;
    complete?: (form: HTMLFormElement) => void;
    error?: (error: any, raw: any, form: HTMLFormElement) => void;
    success?: (data: any, response: any, form: HTMLFormElement) => void;
  };

  type VtsMessageCallback = (
    currentField: HTMLElement,
    label: string,
    title: string,
    message: string
  ) => void;

  type VtsRules = {
    pattern: string;
    flags?: string;
    message?: {
      valid?: string;
      invalid?: string;
    };
  };

  type VtsConfig = {
    halt?: boolean;
    validatedClass?: string;
    ajax?: VtsAjaxSettings;
    fnInvalid?: VtsMessageCallback;
    log?: boolean;
    stopPropagation?: boolean;
    rules?: Map<string, VtsRules>;
    fnValid?: (currentField: HTMLElement) => void;
  };

  type VtsFieldData = {
    field: HTMLElement;
    label: string;
    message: string;
  };

  type VtsFieldMap = Map<string, VtsFieldData>;

  class ValidateThenSubmit {
    constructor(formId: string, config?: VtsConfig);
    readonly abortController: AbortController;
    readonly config: VtsConfig;
    readonly fields: NodeListOf<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >;
    readonly form: HTMLFormElement;

    private init(): void;
    private mixin(): void;
    private _validate(): void;
    private _checkFieldValidity(field: HTMLElement): void;
    private _reportValidity(): void;
    private _setValidity(
      valid: boolean,
      field: HTMLElement,
      data: VtsFieldData
    ): void;
    private _clearValidity(field: HTMLElement): void;
  }

  function setVtsDefaults(config: VtsConfig): void;
  /**
   * test
   */

  export default ValidateThenSubmit;
  export { setVtsDefaults };
}
