// @ts-check
import getResponseData from '../utils/getResponseData';

/** @type {import('../types/base/form').default} */
const vtsForm = {
  isFormValid() {
    return this.form.checkValidity();
  },
  async submit() {
    let data, response;
    let promiseResolved = true;
    const ajax = this.ajax;
    const form = this.form;
    try {
      let url = ajax.action;
      [url, ajax.request] = vtsFormBeforeSend.call(this, url, ajax.request);
      // fetch
      response = await fetch(new Request(url, ajax.request));

      if (!response.ok) throw response;

      data = await getResponseData(response);

      // call success callback function
      ajax.success(data, response, form);
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
      ajax.error(data, response, form);
    }
    // complete
    ajax.complete(data, response, form);

    return promiseResolved
      ? Promise.resolve({ data, response, form })
      : Promise.reject({ data, response, form });
  },
};

/**
 * @description
 * @author RED
 * @param {string} url
 * @param {RequestInit} request
 * @returns {[url, request]}
 * @this {import('../Vts').default}
 */
function vtsFormBeforeSend(url, request) {
  const formData = new FormData(this.form);
  // @ts-ignore
  this.ajax.abortController = new AbortController();
  this.ajax.request.signal = this.ajax.abortController.signal;

  request = this.ajax.request =
    this.ajax.beforeSend(
      this.ajax.request,
      this.ajax.abortController,
      this.form
    ) || request;

  const vMethod = request.method || 'get';

  switch (vMethod.toLocaleLowerCase()) {
    case 'get':
    case 'delete':
      const query = new URLSearchParams(formData.toString());
      url = this.ajax.action = `${url}/?${query}`;
      break;
    case 'put':
    case 'patch':
      // const data = {};
      // const data = Object.fromEntries(formData);
      // console.log(data);
      // formData.forEach((value, key) => {
      //   console.log(key);
      //   console.table(value);
      //   data[key] = value;
      // });
      // @ts-ignore
      request.headers['Content-Type'] = 'application/json';
      request.body = formDataToJSON(formData);
      break;
    default:
      request.body = formData;
      break;
  }
  return [url, request];
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
 * @param {FormData} formData
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
