// @ts-check
/**
 * Gets the data from the response.
 *
 * @param {Response} response The response object.
 * @returns {Promise<any>} A promise that resolves with the data from the response or rejects with an error.
 * @async
 */
export default async function getResponseData(response) {
  try {
    const contentType = response.headers.get('Content-Type');
    if (!contentType)
      throw new Error('Content-Type header not found in the response');
    let data = null;
    if (contentType.includes('application/json')) {
      data = await response.json();
    } else if (
      contentType.includes('text/html') ||
      contentType.includes('text/plain')
    ) {
      data = await response.text();
    }
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
}
