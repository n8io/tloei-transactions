import { defaultTo, evolve, map, pick, pipe, prop } from 'ramda';
import { LeagueMember } from 'types/leagueMember';
import { LeagueView } from 'types/leagueViews';
import { Player } from 'types/player';
import { hydrate, Url } from 'types/url';
import { fetch as fetchJson } from 'utils/fetch';
import { log } from 'utils/log';
import { renameKeys } from 'utils/renameKeys';
import { memberMatchupIdsByWeek } from './utils/memberMatchupIdsByWeek';

const makeMatchupTransform = isAway =>
  pipe(
    prop(isAway ? 'away' : 'home'),
    pick(['rosterForCurrentScoringPeriod', 'teamId', 'totalPoints']),
    ({ rosterForCurrentScoringPeriod, ...rest }) => ({
      ...rest,
      isAway,
      ...pipe(
        pick(['entries']),
        defaultTo([]),
        renameKeys({ entries: 'players' })
      )(defaultTo({}, rosterForCurrentScoringPeriod)),
    }),
    evolve({
      players: map(Player.selector),
    })
  );

const awayTransform = makeMatchupTransform(true);
const homeTransform = makeMatchupTransform(false);

// eslint-disable-next-line max-statements
export const fetch = async ({ seasonId, settings, weekId }) => {
  const url = new URL(hydrate(Url.API_LEAGUE_SETTINGS, { seasonId, weekId }));
  const members = LeagueMember.selector(settings);

  url.searchParams.set(LeagueView.SEARCH_PARAM_NAME, LeagueView.MATCHUPS);
  url.searchParams.set(LeagueView.WEEK_ID_PARAM_NAME, weekId);

  const fullUri = `${url.href}&${LeagueView.SEARCH_PARAM_NAME}=${LeagueView.SCORES}`;

  log(`👐 Fetching week ${weekId} scoring from ${fullUri} ...`);

  const { schedule } = await fetchJson(fullUri);

  log(`👍 Week ${weekId} scoring returned.`);

  const matchupIds = memberMatchupIdsByWeek(members, weekId);
  const matchups = schedule.filter(({ id }) => matchupIds.indexOf(id) > -1);

  return matchups.map(matchup => {
    const { id } = matchup;

    const away = awayTransform(matchup);
    const home = homeTransform(matchup);

    return { away, home, id };
  });
};
