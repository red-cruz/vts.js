// @ts-check

/**
 * Formats an error response from the server.
 *
 * @param {*} data The parsed error data from the server.
 * @param {Response|null} response The error response from the server.
 * @returns {Object} An object with the title and message of the error.
 */
export default function formatResponse(data, response) {
  // Handle error response
  let title = response
    ? `${response.statusText}:  ${response.status}`
    : 'Error';
  let message = data;

  // Check if data is an object
  if (typeof data === 'object') {
    if (response) {
      // data is from server
      title = data.title || title;
      message = data.message || '';

      // for validation errors from server
      const validationErrors = data.validation_errors;
      if (typeof validationErrors === 'object') {
        // Construct error message for display
        message = '';
        for (const err in validationErrors) {
          message += `${validationErrors[err]}<br/>`;
        }
      }
    } else {
      // data is an Error/Exception
      title = data.name || title;
      message = data.stack || data.message || message;
    }
  }

  return { title, message };
}
