import test from 'tape';
import { number } from './number';

test('number', t => {
  const assertions = [
    { expected: 0, fallback: undefined, input: '0' },
    { expected: 1, fallback: undefined, input: '1' },
    { expected: -1, fallback: -1, input: 'NOT_A_NUMBER' },
    { expected: -1, fallback: -1, input: '' },
    { expected: -1, fallback: -1, input: NaN },
    { expected: -1, fallback: -1, input: null },
    { expected: undefined, fallback: undefined, input: undefined },
  ];

  assertions.forEach(({ expected, fallback, input }) => {
    const actual = number(fallback)(input);

    t.equal(actual, expected, `converts ${input} to ${expected}`);
  });

  t.end();
});
