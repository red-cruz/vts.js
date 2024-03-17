import { RuleKey } from './config/rules';

export type ValidationResults = {
  [Key in RuleKey | 'valid']?: Key extends 'validator' ? string | string[] : string;
};
