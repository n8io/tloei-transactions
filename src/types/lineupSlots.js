import { find, path, propEq } from 'ramda';

const findLineupSlotByAbbrev = ({ espn, slot }) => {
  const lineupSlots = path(['constants', 'lineupSlots'], espn);

  return find(propEq('abbrev', slot), lineupSlots);
};

const findLineupSlotById = ({ espn, id }) => {
  const lineupSlots = path(['constants', 'lineupSlots'], espn);

  return find(propEq('id', id), lineupSlots);
};

const QB = ({ espn }) => findLineupSlotByAbbrev({ espn, slot: 'QB' });
const RB = ({ espn }) => findLineupSlotByAbbrev({ espn, slot: 'RB' });
const WR = ({ espn }) => findLineupSlotByAbbrev({ espn, slot: 'WR' });
const TE = ({ espn }) => findLineupSlotByAbbrev({ espn, slot: 'TE' });
const LB = ({ espn }) => findLineupSlotByAbbrev({ espn, slot: 'LB' });
const DL = ({ espn }) => findLineupSlotByAbbrev({ espn, slot: 'DL' });
const DB = ({ espn }) => findLineupSlotByAbbrev({ espn, slot: 'DB' });
const K = ({ espn }) => findLineupSlotByAbbrev({ espn, slot: 'K' });
const P = ({ espn }) => findLineupSlotByAbbrev({ espn, slot: 'P' });
const BENCH = ({ espn }) => findLineupSlotByAbbrev({ espn, slot: 'BE' });
const IR = ({ espn }) => findLineupSlotByAbbrev({ espn, slot: 'IR' });
const FLEX = ({ espn }) => findLineupSlotByAbbrev({ espn, slot: 'FLEX' });

const isStarter = settings => player => {
  /* eslint-disable new-cap */
  const { id: benchId } = BENCH(settings);
  const { id: irId } = IR(settings);
  /* eslint-enable new-cap */

  const { lineupSlotId } = player;

  return [benchId, irId].indexOf(lineupSlotId) === -1;
};

const isBench = settings => player => {
  /* eslint-disable new-cap */
  const { id: benchId } = BENCH(settings);
  const { id: irId } = IR(settings);
  /* eslint-enable new-cap */

  const { lineupSlotId } = player;

  return [benchId, irId].indexOf(lineupSlotId) > -1;
};

export const LineupSlot = {
  BENCH,
  DB,
  DL,
  FLEX,
  IR,
  K,
  LB,
  P,
  QB,
  RB,
  TE,
  WR,
  findLineupSlotByAbbrev,
  findLineupSlotById,
  isBench,
  isStarter,
};
