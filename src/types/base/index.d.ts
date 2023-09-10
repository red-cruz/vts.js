import type Vts from '../../Vts';
import type VtsEventsBase from './events';
import type VtsFormBase from './form';
import VtsRulesBase from './rules';
import type VtsValidation from './validation';

interface VtsBase extends Vts, VtsEventsBase, VtsValidation, VtsRulesBase {}
