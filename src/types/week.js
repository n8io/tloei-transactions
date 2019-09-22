import { getConfig } from 'config';
import { prop, subtract } from 'ramda';
import { fetch } from 'utils/fetch';
import { log } from 'utils/log';
import { LeagueView } from './leagueViews';
import { Season } from './season';
import { hydrate, Url } from './url';

const selector = prop('scoringPeriodId');

let weekId = null;

// eslint-disable-next-line max-statements
const current = async tempSeasonId => {
  if (weekId) return weekId;

  const seasonId = tempSeasonId || (await Season.current());

  const config = getConfig();

  const { ESPN_WEEK_ID: tempWeekId, PREVIOUS_WEEK } = config;

  // eslint-disable-next-line require-atomic-updates
  weekId = tempWeekId;

  if (!weekId) {
    const url = new URL(hydrate(Url.API_LEAGUE_SETTINGS, { seasonId }));

    url.searchParams.set(LeagueView.SEARCH_PARAM_NAME, LeagueView.LIGHT);

    log(`👐 Fetching current week ${url.href} ...`);

    const response = await fetch(url.href);

    // eslint-disable-next-line require-atomic-updates
    weekId = selector(response);

    log(`👍 Current week is ${weekId}.`);
  }

  if (PREVIOUS_WEEK) {
    log(`◀️ PREVIOUS_WEEK flag provided. Adjusting to prior week.`);
    // eslint-disable-next-line require-atomic-updates
    weekId = subtract(weekId, 1);
  }

  log(`🧮 Determined Week ${weekId} should be processed`);

  return weekId;
};

export const Week = {
  current,
};
