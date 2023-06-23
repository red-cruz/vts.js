import Vts from '../vts';

export default class LogUtil {
  /**
   * @description
   * @author RED
   * @static
   * @param {Vts} Vts
   * @memberof LogUtil
   */
  static start(Vts) {
    const mustLog = Vts.config.log;
    mustLog && console.group('vts#' + Vts.form.id);
    mustLog && console.time('vts_time#' + Vts.form.id);
    LogUtil.show(mustLog, 'log', Vts);
  }

  static show(mustLog, type, ...message) {
    if (!mustLog) return;

    const msg = '%c' + message.join(' ');
    const style = 'color: #FFFFFF; padding: 5px';

    switch (type) {
      case 'log':
        console.log(...message);
        break;
      case 'info':
        console.info(msg, 'background: #5DADE2;' + style);
        break;
      case 'success':
        console.info(msg, 'background: #008000;' + style);
        break;
      case 'warn':
        console.warn(...message);
        break;
      case 'error':
        console.error(...message);
        break;
    }
  }

  static end(mustLog, formId) {
    mustLog && console.groupEnd('vts#' + formId);
    mustLog && console.timeEnd('vts_time#' + formId);
  }
}
