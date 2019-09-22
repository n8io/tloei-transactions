import { always, pipe, unless } from 'ramda';

export const number = fallback =>
  pipe(
    input => parseInt(input, 10),
    unless(Number.isInteger, always(fallback))
  );
