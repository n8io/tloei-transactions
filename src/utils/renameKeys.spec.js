import test from 'tape';
import { renameKeys } from './renameKeys';

test('renameKeys', t => {
  const assertions = [
    { expected: { a: 'a' }, input: { b: 'a' }, rename: { b: 'a' } },
    {
      expected: { bar: { a: 1 } },
      input: { foo: { a: 1 } },
      rename: { foo: 'bar' },
    },
    { expected: { a: 'a' }, input: { a: 'a' }, rename: { c: 'd' } },
  ];

  assertions.forEach(({ expected, input, rename }) => {
    const actual = renameKeys(rename)(input);

    t.deepEqual(
      actual,
      expected,
      `converts ${JSON.stringify(input)} using ${JSON.stringify(
        rename
      )} to ${JSON.stringify(expected)}`
    );
  });

  t.end();
});
