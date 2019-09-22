import { path, pipe, prop } from 'ramda';

const findById = ({ espn }) => id =>
  pipe(
    path(['constants', 'proTeamsMap']),
    prop(id.toString())
  )(espn);

export const ProTeam = {
  findById,
};
