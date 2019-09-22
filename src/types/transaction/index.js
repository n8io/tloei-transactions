import { evolve, map, pick, pipe } from 'ramda';
import { LeagueView } from 'types/leagueViews';
import { hydrate, Url } from 'types/url';
import { fetch as fetchJson } from 'utils/fetch';
import { log } from 'utils/log';
import { renameKeys } from 'utils/renameKeys';
import { save } from './google';

const apiToUi = pipe(
  evolve({
    transactionCounter: pipe(
      pick(['acquisitions', 'drops', 'moveToIR', 'trades']),
      renameKeys({
        acquisitions: 'adds',
        moveToIR: 'injuredReserves',
      })
    ),
  }),
  renameKeys({ transactionCounter: 'counts' })
);

const fetch = async ({ seasonId }) => {
  const url = new URL(hydrate(Url.API_LEAGUE_SETTINGS, { seasonId }));

  url.searchParams.set(LeagueView.SEARCH_PARAM_NAME, LeagueView.TEAM);

  const uri = url.href;

  log(`👐 Fetching transactions counts from ${uri} ...`);

  const { teams } = await fetchJson(uri);

  log(`👍 Transaction counts returned.`);

  return pipe(
    map(pick(['abbrev', 'id', 'transactionCounter'])),
    map(apiToUi)
  )(teams);
};

export const Transaction = {
  fetch,
  save,
};
