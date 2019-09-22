import { getConfig } from 'config';
import { prop, subtract } from 'ramda';
import { fetch } from 'utils/fetch';
import { log } from 'utils/log';
import { LeagueView } from './leagueViews';
import { hydrate, Url } from './url';

const selector = prop('seasonId');

let seasonId = null;

const defaultSeasonId = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  if (month > 1 && month < 7) return year - 1;

  return year;
};

// eslint-disable-next-line max-statements
const current = async () => {
  if (seasonId) return seasonId;

  const config = getConfig();

  const { ESPN_SEASON_ID: tempSeasonId, PREVIOUS_SEASON } = config;

  seasonId = tempSeasonId;

  if (!seasonId) {
    const url = new URL(
      hydrate(Url.API_LEAGUE_SETTINGS, { seasonId: defaultSeasonId() })
    );

    url.searchParams.set(LeagueView.SEARCH_PARAM_NAME, LeagueView.LIGHT);

    log(`👐 Fetching current season ${url.href} ...`);

    const response = await fetch(url.href);

    // eslint-disable-next-line require-atomic-updates
    seasonId = selector(response);

    log(`👍 Current season is ${seasonId}.`);
  }

  if (PREVIOUS_SEASON) {
    log(`◀️ PREVIOUS_SEASON flag provided. Adjusting to prior season.`);
    // eslint-disable-next-line require-atomic-updates
    seasonId = subtract(seasonId, 1);
  }

  log(`🧮 Determined season ${seasonId} should be processed`);

  return seasonId;
};

export const Season = {
  current,
};
