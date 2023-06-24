import Vts from '../vts';

export default class LogUtil {
  /**
   * @description
   * @author RED
   * @static
   * @this {Vts}
   * @memberof LogUtil
   */
  static start() {
    const mustLog = this.config.log;
    const formId = this.form.id;
    if (!mustLog) return;
    console.group('vts#' + formId);
    console.time('vts_time#' + formId);
    LogUtil.show(mustLog, 'log', this);
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
    if (!mustLog) return;
    LogUtil.show(mustLog, 'info', 'Validation ended');
    console.timeEnd('vts_time#' + formId);
    console.groupEnd('vts#' + formId);
  }
}
