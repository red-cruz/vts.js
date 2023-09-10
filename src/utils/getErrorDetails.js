// @ts-check

/**
 * Formats an error response from the server.
 *
 * @param {*} errorData The parsed error data from the server.
 * @param {Response|null} errorResponse The error response from the server.
 * @returns {Object} An object with the title and message of the error.
 */
export default function formatError(errorData, errorResponse) {
  // Handle error response
  let title = errorResponse
    ? `${errorResponse.statusText}:  ${errorResponse.status}`
    : 'Error';
  let message = errorData;

  // Check if errorData is an object
  if (typeof errorData === 'object') {
    if (errorResponse) {
      // errorData is from server
      title = errorData.title || title;
      message = errorData.message || '';

      // for validation errors from server
      const validationErrors = errorData.validation_errors;
      if (typeof validationErrors === 'object') {
        // Construct error message for display
        message = '';
        for (const err in validationErrors) {
          message += `${validationErrors[err]}<br/>`;
        }
      }
    } else {
      // errorData is an Error/Exception
      title = errorData.name || title;
      message = errorData.stack || errorData.message || message;
    }
  }

  return { title, message };
}
