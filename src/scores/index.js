import { fetch as fetchMatchups } from './matchups';

export const fetch = ({ seasonId, settings, weekId }) =>
  fetchMatchups({ seasonId, settings, weekId });
