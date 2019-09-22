import { find, path, propEq } from 'ramda';

const findPositionByAbbrev = ({ espn, position }) => {
  const positions = path(['constants', 'positions'], espn);

  return find(propEq('abbrev', position), positions);
};

const findPositionById = ({ espn, id }) => {
  const positions = path(['constants', 'positions'], espn);

  return find(propEq('id', id), positions);
};

const QB = ({ espn }) => findPositionByAbbrev({ espn, position: 'QB' });
const RB = ({ espn }) => findPositionByAbbrev({ espn, position: 'RB' });
const WR = ({ espn }) => findPositionByAbbrev({ espn, position: 'WR' });
const TE = ({ espn }) => findPositionByAbbrev({ espn, position: 'TE' });
const CB = ({ espn }) => findPositionByAbbrev({ espn, position: 'CB' });
const DE = ({ espn }) => findPositionByAbbrev({ espn, position: 'DE' });
const DT = ({ espn }) => findPositionByAbbrev({ espn, position: 'DT' });
const LB = ({ espn }) => findPositionByAbbrev({ espn, position: 'LB' });
const K = ({ espn }) => findPositionByAbbrev({ espn, position: 'K' });
const P = ({ espn }) => findPositionByAbbrev({ espn, position: 'P' });
const S = ({ espn }) => findPositionByAbbrev({ espn, position: 'S' });

const isDefensive = settings => player => {
  /* eslint-disable new-cap */
  const { id: cbId } = CB(settings);
  const { id: deId } = DE(settings);
  const { id: dtId } = DT(settings);
  const { id: lbId } = LB(settings);
  const { id: sId } = S(settings);
  /* eslint-enable new-cap */

  const { defaultPositionId: positionId } = player;

  return [cbId, deId, dtId, lbId, sId].indexOf(positionId) > -1;
};

const isOffensive = settings => player => {
  /* eslint-disable new-cap */
  const { id: qbId } = QB(settings);
  const { id: rbId } = RB(settings);
  const { id: teId } = TE(settings);
  const { id: wrId } = WR(settings);
  /* eslint-enable new-cap */

  const { defaultPositionId: positionId } = player;

  return [qbId, rbId, teId, wrId].indexOf(positionId) > -1;
};

const isSpecialTeams = settings => player => {
  /* eslint-disable new-cap */
  const { id: kId } = K(settings);
  const { id: pId } = P(settings);
  /* eslint-enable new-cap */

  const { defaultPositionId: positionId } = player;

  return [kId, pId].indexOf(positionId) > -1;
};

export const Position = {
  CB,
  DE,
  DT,
  K,
  LB,
  P,
  QB,
  RB,
  TE,
  WR,
  findPositionByAbbrev,
  findPositionById,
  isDefensive,
  isOffensive,
  isSpecialTeams,
};
