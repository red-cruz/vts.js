// @ts-check
const dialogId = 'Vts_dialog';
const dialogTitleId = `${dialogId}_title`;
const dialogMsgId = `${dialogId}_message`;
const dialogBtnContainerId = `${dialogId}_button`;

/** @type {import("../types/config/responseMessage").default} */
const vtsResponseMessages = {
  400: {
    title: 'Something went wrong',
    message: `The request was invalid. Please try again later.`,
  },
  401: {
    title: 'Unauthorized',
    message: `You need to be logged in to access this resource.`,
  },
  403: {
    title: 'Forbidden',
    message: `You don't have permission to access this resource.`,
  },
  404: {
    title: 'Not Found',
    message: `The requested resource could not be found.`,
  },
  405: {
    title: 'Method Not Allowed',
    message: `The requested method is not allowed for this resource.`,
  },
  409: {
    title: 'Conflict',
    message: `The request could not be completed because of a conflict.`,
  },
  415: {
    title: 'Unsupported Media Type',
    message: `The request is not in a supported format.`,
  },
  422: {
    title: 'Invalid Data',
    message:
      'The data provided was invalid. Please correct the errors and try again.',
  },
  429: {
    title: 'Too Many Requests',
    message: `You have made too many requests in a short period of time. Please try again later.`,
  },
  500: {
    title: 'Internal Server Error',
    message: `An unexpected error occurred on the server. We're working on it and will fix it as soon as possible.`,
  },
  503: {
    title: 'Service Unavailable',
    message: `The service is unavailable at this time. Please try again later.`,
  },
};

export {
  dialogId,
  dialogMsgId,
  dialogTitleId,
  vtsResponseMessages,
  dialogBtnContainerId,
};
