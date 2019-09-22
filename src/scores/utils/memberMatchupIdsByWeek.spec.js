import test from 'tape';
import { memberMatchupIdsByWeek } from './memberMatchupIdsByWeek';

const makeMembers = number => [...Array(number).keys()];

test('matchups', t => {
  const assertions = [
    { expected: [1, 2, 3, 4, 5, 6], membersCount: 12, week: 1 },
    { expected: [3, 4], membersCount: 4, week: 2 },
    { expected: [7, 8, 9], membersCount: 6, week: 3 },
    { expected: [45, 46, 47, 48], membersCount: 8, week: 12 },
    { expected: [79, 80, 81, 82, 83, 84], membersCount: 12, week: 14 },
  ];

  assertions.forEach(({ expected, membersCount, week }) => {
    const members = makeMembers(membersCount);
    const actual = memberMatchupIdsByWeek(members, week);

    t.deepEqual(actual, expected);
  });

  t.end();
});
