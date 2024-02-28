const defaultMsg = {
  after: 'Must be after the {:targetLabel}.',
  afterOrEqual: 'Must be after or equal to {:targetLabel}.',
  before: 'Must be before {:targetValue}.',
  beforeOrEqual: 'Must be before or equal to {:targetValue}.',
  checking: 'Checking... {:label}',
  endsWith: 'Must end with {:endsWith}.',
  equalTo: 'Must be equal to {:equalTo}.',
  inArray: 'Must be one of the following: {:values}.',
  max: 'Must be less than or equal to {:max}.',
  min: 'Must be greater than or equal to {:min}.',
  notEqualTo: 'Must be different from {:notEqualTo}.',
  notInArray: 'Must not be one of the following: {:values}.',
  pattern: '{:label} does not match the pattern "{:pattern}"',
  startsWith: 'Must start with {:startsWith}.',
  size: 'Must be exactly {:size} characters long. You are currently using {:length} characters.',
  valid: '',
  required: 'This field is required.',
  requiredIf: '{:label} is required if {:targetLabel} has a value.',
};

export default defaultMsg;
