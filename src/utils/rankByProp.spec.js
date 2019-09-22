import test from 'tape';
import { rankByProp } from './rankByProp';

test('rankByProp', t => {
  const assertions = [
    {
      expected: [
        { prop: 3, rank: 1 },
        { prop: 2, rank: 2 },
        { prop: 1, rank: 3 },
      ],
      input: [{ prop: 2 }, { prop: 3 }, { prop: 1 }],
      name: 'ranks by prop',
    },
  ];

  assertions.forEach(({ expected, input, name }) => {
    const actual = rankByProp('prop', input);

    t.deepEqual(actual, expected, name);
  });

  t.end();
});
