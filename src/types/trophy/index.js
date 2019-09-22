import { Calculations } from './calculations';
import { Enumeration } from './enumeration';
import { save as saveGist } from './gist';
import { save as saveGoogle } from './google';
import { print } from './print';

export const Trophy = {
  ...Enumeration,
  ...Calculations,
  print,
  saveGist,
  saveGoogle,
};
