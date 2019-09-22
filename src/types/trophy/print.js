import { cond, join, map, pipe, propEq, T } from 'ramda';
import { Enumeration } from './enumeration';

const tab = '  ';

const formatTeam = (p, index) => `${index + 1}. ${p.team} - ${p.totalPoints}`;

const formatPlayer = (p, index) =>
  `${index + 1}. ${p.team} - ${p.proTeam.toUpperCase()} ${p.position} ${
    p.firstName
  } ${p.lastName} - ${p.totalPoints}`;

const formatHighScoreTeamTrophy = ({ players, trophy }) =>
  `${trophy}s\n${tab}${players.map(formatTeam).join(`\n${tab}`)}`;

const formatPlayerTrophy = ({ players, trophy }) =>
  `${trophy}s\n${tab}${players.map(formatPlayer).join(`\n${tab}`)}`;

const printTrophy = cond([
  [propEq('trophy', Enumeration.HS_T), formatHighScoreTeamTrophy],
  [T, formatPlayerTrophy],
]);

const addTrophyProp = ({ key, ...rest }) => ({
  ...rest,
  trophy: Enumeration[key],
});

export const print = pipe(
  map(addTrophyProp),
  map(printTrophy),
  join('\n')
);
