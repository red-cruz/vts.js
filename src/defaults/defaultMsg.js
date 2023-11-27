const defaultMsg = {
  after: '{:label} must be {:offset} after {:targetLabel}.',
  afterOrEqual: '{:label} must be {:offset} after or equal to {:targetLabel}.',
  before: '{:label} must be before {:targetValue}.',
  beforeOrEqual: '{:label} must be before or equal to {:targetValue}.',
  between: '{:label} must be between {:minValue} and {:maxValue}.',
  checking: 'Checking... {:label}',
  differentFrom: '{:label} must be different from {:targetValue}.',
  endsWith: '{:label} must end with {:endsWith}.',
  equalTo: '{:label} must be equal to {:targetLabel}.',
  inArray: '{:label} must be one of the following: {:values}.',
  lowercase: '{:label} must be lowercase.',
  max: '{:label} must be less than or equal to {:maxValue}.',
  min: '{:label} must be greater than or equal to {:minValue}.',
  notInArray: '{:label} must not be one of the following: {:values}.',
  startsWith: '{:label} must start with {:startsWith}.',
  size: '{:label} must be exactly {:size} characters long. You are currently using {:length} characters.',
  uppercase: '{:label} must be uppercase.',
  valid: '',
  required: 'Please enter a value for {:label}.',
  requiredIf: '{:label} is required if {:targetLabel} has a value.',
};

export default defaultMsg;
