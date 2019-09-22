import {
  add,
  ascend,
  descend,
  findIndex,
  map,
  mergeRight,
  pipe,
  prop,
  propEq,
  sort,
} from 'ramda';

const rankByProp = (propName, items, isAscending) => {
  const selectPropOfInterest = prop(propName); // selector for prop of interest
  const direction = isAscending ? ascend : descend; // sort direction function
  const sortItemsByProp = sort(direction(selectPropOfInterest)); // sort by prop of interest comparator
  const sortedItems = sortItemsByProp(items); // sorted items array
  const sortItemByRank = sort(ascend(prop('rank'))); // sort by rank comparator

  const calculateRank = value =>
    pipe(
      findIndex(propEq(propName, value)), // find first occurence of prop value
      add(1) // rank is one based
    )(sortedItems);

  const addRank = item =>
    mergeRight(item, {
      rank: calculateRank(selectPropOfInterest(item)),
    });

  return pipe(
    map(addRank), // add rank to item
    sortItemByRank // sort by rank ascending
  )(items);
};

export { rankByProp };
