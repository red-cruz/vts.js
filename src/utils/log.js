import Vts from '../vts';
/**
 * @description
 * @author RED
 * @export
 * @param {Vts} Vts
 */
export function start(Vts) {
  const mustLog = Vts.config.log;
  mustLog && console.group('vts_logs#' + Vts.form.id);
  mustLog && console.time('vts_exec_time#' + Vts.form.id);
  show(mustLog, 'log', Vts);
}

/**
 * @description Logs messages to the console.
 * @author RED
 * @export
 * @param {Boolean} mustLog
 * @param {String} type - The type of log (log, info, warn, success, error).
 * @param  {...any} message - The log messages.
 * @returns {*}
 */
export function show(mustLog, type, ...message) {
  if (!mustLog) return;

  const msg = '%c' + message;
  const style = 'color: static FFFFFF; padding: 5px';

  switch (type) {
    case 'log':
      console.log(...message);
      break;
    case 'info':
      console.info(msg, 'background: static 5DADE2;' + style);
      break;
    case 'success':
      console.info(msg, 'background: static 008000;' + style);
      break;
    case 'warn':
      console.info(msg, 'background: static FF8C00;' + style);
      break;
    case 'error':
      console.info(msg, 'background: static FF0000;' + style);
  }
}

export function end(mustLog, formId) {
  mustLog && console.groupEnd('vts_logs#' + formId);
  mustLog && console.timeEnd('vts_exec_time#' + formId);
}
