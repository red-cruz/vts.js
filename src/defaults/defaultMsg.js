const defaultMsg = {
  after: '{:label} must be after {:targetValue}.',
  afterOrEqual: '{:label} must be after or equal to {:targetValue}.',
  badInput: 'Please enter a valid value.',
  before: '{:label} must be before {:targetValue}.',
  beforeOrEqual: '{:label} must be before or equal to {:targetValue}.',
  between: '{:label} must be between {:minValue} and {:maxValue}.',
  checking: 'Checking...',
  differentFrom: '{:label} must be different from {:targetValue}.',
  endsWith: '{:label} must end with {:value}.',
  equalTo: '{:label} must be equal to {:targetLabel}.',
  in: '{:label} must be one of the following: {:values}.',
  lowercase: '{:label} must be lowercase.',
  max: '{:label} must be less than or equal to {:maxValue}.',
  min: '{:label} must be greater than or equal to {:minValue}.',
  notIn: '{:label} must not be one of the following: {:values}.',
  patternMismatch: '{:label} must match the requested pattern.',
  rangeOverflow:
    '{:label} must be within the range of {:minValue} to {:maxValue}.',
  rangeUnderflow:
    '{:label} must be within the range of {:minValue} to {:maxValue}.',
  startsWith: '{:label} must start with {:value}.',
  size: '{:label} must be between {:minLength} and {:maxLength} characters long.',
  stepMismatch: '{:label} must be a multiple of {:stepValue}.',
  tooLong: '{:label} must be at most {:maxLength} characters long.',
  tooShort: '{:label} must be at least {:minLength} characters long.',
  typeMismatch: '{:label} must be of type {:type}.',
  unique: '{:label} must be unique.',
  uppercase: '{:label} must be uppercase.',
  valid: '',
  valueMissing: 'Please enter a value for {:label}.',
};

export default defaultMsg;
