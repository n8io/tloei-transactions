import { evolve, filter, map, pathEq, pipe, propOr, sum } from 'ramda';
import { LeagueMember } from 'types/leagueMember';
import { LineupSlot } from 'types/lineupSlots';
import { Position } from 'types/positions';
import { ProTeam } from 'types/proTeam';
import { renameKeys } from 'utils/renameKeys';
import { apply } from './apply';
import { adjustments as dlAdjustments } from './dl';
import { adjustments as teAdjustments } from './te';

const sumPlayerAdjustments = adjustments => ({ id }) =>
  pipe(
    filter(pathEq(['player', 'id'], id)),
    map(propOr(0, 'bonus')),
    sum
  )(adjustments);

const addNewTotal = (adjustments, settings) =>
  map(
    pipe(
      p => ({
        ...p,
        appliedStatTotalNew:
          p.appliedStatTotal + sumPlayerAdjustments(adjustments)(p),
        bonus: sumPlayerAdjustments(adjustments)(p),
        isDefensive: Position.isDefensive(settings)(p),
        isOffensive: Position.isOffensive(settings)(p),
        isSpecialTeams: Position.isSpecialTeams(settings)(p),
        isStarter: LineupSlot.isStarter(settings)(p),
        lineupPosition: LineupSlot.findLineupSlotById({
          espn: settings.espn,
          id: p.lineupSlotId,
        }).abbrev,
        position: Position.findPositionById({
          espn: settings.espn,
          id: p.defaultPositionId,
        }).abbrev,
        proTeam: ProTeam.findById(settings)(p.proTeamId).abbrev.toString(),
        // team: LeagueMember.findById(settings)(p.teamId).abbrev,
      }),
      renameKeys({ appliedStatTotalNew: 'appliedStatTotal' })
    )
  );

const addTeamAdjustments = settings => ({ players = [], ...rest }) => {
  const adjustments = [
    ...dlAdjustments(settings)(players),
    ...teAdjustments(settings)(players),
  ];

  const output = {
    ...rest,
    adjustments,
    players: addNewTotal(adjustments, settings)(players),
    team: LeagueMember.findById(settings)(rest.teamId).abbrev,
  };

  return output;
};

const appendMatchupAdjustments = settings =>
  evolve({
    away: addTeamAdjustments(settings),
    home: addTeamAdjustments(settings),
  });

const makeAdjustPlayerScores = settings => appendMatchupAdjustments(settings);

export const addAdjustments = ({ matchups, settings }) => {
  const adjustPlayerScores = makeAdjustPlayerScores(settings);

  return map(adjustPlayerScores, matchups);
};

export { apply };
