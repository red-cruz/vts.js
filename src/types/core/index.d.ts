import type Vts from '../../Vts';
import type VtsEventsCore from './events';
import VtsRulesCore from './rules';
import type VtsValidation from './validation';

export default interface VtsCore
  extends Vts,
    VtsEventsCore,
    VtsValidation,
    VtsRulesCore {}
