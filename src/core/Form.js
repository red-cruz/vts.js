// @ts-check
import getResponseData from '../utils/getResponseData';

/** @type {import('../types/core/form').default} */
const vtsForm = {
  async isFormValid(validate = false) {
    validate && (await this.validate());
    return this.form.checkValidity();
  },

  async submit() {
    let data, response;
    let promiseResolved = true;
    const ajax = this.ajax;
    const form = this.form;
    const action = (this.ajax.action = this.ajax.action ?? form.action);
    try {
      // call beforesend callback function
      await vtsFormBeforeSend.call(this);

      // fetch
      response = await fetch(new Request(action, this.ajax.request));

      if (!response.ok) throw response;

      data = await getResponseData(response);

      // call success callback function
      await ajax.success(data, response, form);
    } catch (error) {
      data = error;
      response = null;

      // Reinitialize abort controller if aborted
      if (this.ajax.request.signal?.aborted) {
        // @ts-ignore
        this.ajax.abortController = new AbortController();
      }

      // Check if the error is an instance of Response
      if (error instanceof Response) {
        data = await getResponseData(error);
        response = error;
      }

      promiseResolved = false;

      // Call the error callback function with the appropriate data
      await ajax.error(data, response, form);
    }

    // complete
    ajax.complete(data, response, form);

    return promiseResolved
      ? Promise.resolve({ data, response, form })
      : Promise.reject({ data, response, form });
  },
};

/**
 * @this {import('../Vts').default}
 */
async function vtsFormBeforeSend() {
  // @ts-ignore
  this.ajax.abortController = new AbortController();
  this.ajax.request.signal = this.ajax.abortController.signal;
  this.ajax.request.body = new FormData(this.form);

  // call beforeSend config and assign the configured request
  await this.ajax.beforeSend(
    this.ajax.request,
    this.form,
    this.ajax.abortController
  );

  const vMethod = this.ajax.request.method || 'get';

  const formData = this.ajax.request.body;

  if (typeof formData === 'object' && formData)
    switch (vMethod.toLocaleLowerCase()) {
      case 'get':
      case 'delete':
        const query = new URLSearchParams(formData.toString());
        this.ajax.action = `${this.ajax.action}/?${query}`;
        break;
      case 'put':
      case 'patch':
        if (!this.ajax.request.headers) this.ajax.request.headers = {};

        this.ajax.request.headers['Content-Type'] = 'application/json';
        this.ajax.request.body = formDataToJSON(formData);
        break;
      default:
        this.ajax.request.body = formData;
        break;
    }
}

/**
 * @param {{}} obj
 * @param {*} path
 * @param {FormDataEntryValue} value
 * @returns {{}}
 */
function deepSet(obj, path, value) {
  if (Object(obj) !== obj) return obj; // When obj is not an object
  // If not yet an array, get the keys from the string-path
  if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || [];
  path.slice(0, -1).reduce(
    // Iterate all of them except the last one
    (a, c, i) =>
      Object(a[c]) === a[c] // Does the key exist and is its value an object?
        ? // Yes: then follow that path
          a[c]
        : // No: create the key. Is the next key a potential array-index?
          (a[c] =
            Math.abs(path[i + 1]) >> 0 === +path[i + 1]
              ? [] // Yes: assign a new array object
              : {}), // No: assign a new plain object
    obj
  )[path[path.length - 1]] = value; // Finally assign the value to the last key
  return obj; // Return the top-level object to allow chaining
}

/**
 * @description
 * @param {*} formData
 * @returns {String}
 */
function formDataToJSON(formData) {
  const json = {};
  for (const [path, value] of formData) {
    deepSet(json, path, value);
  }
  return JSON.stringify(json);
}

export default vtsForm;
