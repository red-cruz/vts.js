import type Vts from '../../Vts';
import type VtsEventsBase from './events';
import VtsRulesBase from './rules';
import type VtsValidation from './validation';

export default interface VtsBase
  extends Vts,
    VtsEventsBase,
    VtsValidation,
    VtsRulesBase {}
