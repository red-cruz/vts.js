const defaultMsg = {
  after: 'Must be after {:after}.',
  afterOrEqual: 'Must be after or equal to {:afterOrEqual}.',
  before: 'Must be before {:before}.',
  beforeOrEqual: 'Must be before or equal to {:beforeOrEqual}.',
  checking: 'Checking... {:label}',
  endsWith: 'Must end with {:endsWith}.',
  equalTo: 'Must be equal to {:targetLabel}.',
  inArray: 'Must be one of the following: {:values}.',
  max: 'Must be less than or equal to {:max}.',
  maxLength: 'Must be at most {:maxLength} characters long.',
  min: 'Must be greater than or equal to {:min}.',
  minLength: 'Must be at least {:minLength} characters long.',
  notEqualTo: 'Must be different from {:notEqualTo}.',
  notInArray: 'Must not be one of the following: {:values}.',
  pattern: 'Must match the pattern "{:pattern}"',
  startsWith: 'Must start with {:startsWith}.',
  size: 'Must be exactly {:size} characters long. You are currently using {:length} characters.',
  valid: '',
  required: 'This field is required.',
};

export default defaultMsg;
