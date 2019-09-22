import { find, path, propEq } from 'ramda';

const scoringItemsSelector = path([
  'settings',
  'scoringSettings',
  'scoringItems',
]);

const findStatScoringByStatId = ({ id, settings }) => {
  const { league } = settings;
  const scoringItems = scoringItemsSelector(league);

  return find(propEq('statId', id), scoringItems);
};

const findStatByStatId = ({ id, settings }) => {
  const { espn } = settings;
  const stats = path(['constants', 'statSettings', 'stats'], espn);

  return find(propEq('id', id), stats);
};

const statMap = path(['constants', 'statSettings', 'statMap']);

export const StatScoring = {
  findStatByStatId,
  findStatScoringByStatId,
  selector: scoringItemsSelector,
  statMap,
};
