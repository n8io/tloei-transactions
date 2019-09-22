import test from 'tape';
import { stringToBool } from './bool';

test('bool', t => {
  const assertions = [
    { expected: true, input: 'true' },
    { expected: false, input: 'false' },
    { expected: true, input: 'True' },
    { expected: false, input: 'False' },
    { expected: true, input: '1' },
    { expected: false, input: '0' },
    { expected: true, input: 'T' },
    { expected: false, input: 'F' },
    { expected: true, input: 't' },
    { expected: false, input: 'f' },
    { expected: false, input: '' },
    { expected: false, input: null },
    { expected: false, input: undefined },
  ];

  assertions.forEach(({ expected, input }) => {
    const actual = stringToBool(input);

    t.equal(actual, expected, `converts ${input} to ${expected}`);
  });

  t.end();
});
