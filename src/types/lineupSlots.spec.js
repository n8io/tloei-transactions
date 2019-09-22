import test from 'tape';
import { readEspnSettings } from 'utils/settings';
import { LineupSlot } from './lineupSlots';

(async () => {
  test('LineupSlot', async t => {
    try {
      const espn = await readEspnSettings();
      const settings = { espn };
      const assertions = [
        {
          expected: true,
          input: { lineupSlotId: 20 /* BE */ },
          method: 'isBench',
          name: 'report bench properly for Bench lineup slot',
        },
        {
          expected: true,
          input: { lineupSlotId: 21 /* IR */ },
          method: 'isBench',
          name: 'report bench properly for IR lineup slot',
        },
        {
          expected: true,
          input: { lineupSlotId: 0 /* QB */ },
          method: 'isStarter',
          name: 'report starter properly for QB lineup slot',
        },
        {
          expected: true,
          input: { lineupSlotId: 8 /* DL */ },
          method: 'isStarter',
          name: 'report starter properly for DL lineup slot',
        },
      ];

      assertions.forEach(({ expected, input, method, name }) => {
        const actual = LineupSlot[method](settings)(input);

        t.equal(actual, expected, name);
      });

      t.end();
    } catch (e) {
      t.fail(e);
    }
  });
})();
