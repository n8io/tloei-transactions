import { map, reduce } from 'ramda';
import { LeagueMember } from './leagueMember';
import { Player } from './player';

const apiToUi = reduce(
  (acc, { away, home, id }) => [
    ...acc,
    {
      away: {
        ...away,
        players: map(Player.apiToUi, away.players),
      },
      home: {
        ...home,
        players: map(Player.apiToUi, home.players),
      },
      id,
    },
  ],
  []
);

const uiToFlattened = settings =>
  reduce(
    (acc, { away, home, id }) => [
      ...acc,
      ...map(
        p => ({
          ...p,
          matchupId: id,
          team: LeagueMember.findById(settings)(away.teamId).abbrev,
          teamId: away.teamId,
        }),
        away.players
      ),
      ...map(
        p => ({
          ...p,
          matchupId: id,
          team: LeagueMember.findById(settings)(home.teamId).abbrev,
          teamId: home.teamId,
        }),
        home.players
      ),
    ],
    []
  );

export const Matchup = {
  apiToUi,
  uiToFlattened,
};
