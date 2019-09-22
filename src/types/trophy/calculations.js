import {
  both,
  descend,
  filter,
  flatten,
  map,
  pick,
  pipe,
  prop,
  propEq,
  slice,
  sort,
} from 'ramda';
import { rankByProp } from 'utils/rankByProp';
import { renameKeys } from 'utils/renameKeys';

const normalizePointsProp = map(
  renameKeys({ appliedStatTotal: 'totalPoints' })
);

const rankEm = players => rankByProp('totalPoints', players);

const calculateDefensivePlayerHighScores = (players, limit = 1) =>
  pipe(
    filter(both(propEq('isStarter', true), propEq('isDefensive', true))),
    sort(descend(prop('appliedStatTotal'))),
    slice(0, limit),
    normalizePointsProp,
    rankEm
  )(players);

const calculateOffensivePlayerHighScores = (players, limit = 1) =>
  pipe(
    filter(both(propEq('isStarter', true), propEq('isOffensive', true))),
    sort(descend(prop('appliedStatTotal'))),
    slice(0, limit),
    normalizePointsProp,
    rankEm
  )(players);

const calculateSpecialTeamsPlayerHighScores = (players, limit = 1) =>
  pipe(
    filter(both(propEq('isStarter', true), propEq('isSpecialTeams', true))),
    sort(descend(prop('appliedStatTotal'))),
    slice(0, limit),
    normalizePointsProp,
    rankEm
  )(players);

const calculateHindsightPlayerHighScores = (players, limit = 1) =>
  pipe(
    filter(propEq('isStarter', false)),
    sort(descend(prop('appliedStatTotal'))),
    slice(0, limit),
    normalizePointsProp,
    rankEm
  )(players);

const teamTransform = pipe(pick(['team', 'teamId', 'totalPoints']));

const matchupToTeamScores = ({ away, home }) => [
  teamTransform(away),
  teamTransform(home),
];

const calculateTeamHighScores = (matchups, limit = 1) =>
  pipe(
    map(matchupToTeamScores),
    flatten,
    sort(descend(prop('totalPoints'))),
    slice(0, limit),
    normalizePointsProp,
    rankEm
  )(matchups);

export const Calculations = {
  calculateDefensivePlayerHighScores,
  calculateHindsightPlayerHighScores,
  calculateOffensivePlayerHighScores,
  calculateSpecialTeamsPlayerHighScores,
  calculateTeamHighScores,
};
