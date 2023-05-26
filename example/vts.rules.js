import vtsDefaults from '../vts.defaults.js';

vtsDefaults.rules = {
  first_name: {
    pattern: '\\w',
    flags: 'g',
    title: 'First name is not valid!',
    message: 'Must be a word character',
  },
  last_name: {
    pattern: '\\w',
    flags: 'g',
    message: 'Last name is not valid!',
  },
  user_name: {
    match: 'first_name',
    title: 'Dapat ano',
    message: 'oks not equal',
  },
};
