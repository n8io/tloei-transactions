import { getConfig } from 'config';

const { ESPN_LEAGUE_ID, ESPN_SEASON_ID, ESPN_WEEK_ID } = getConfig();

const hydrate = (rawUrl, { leagueId, seasonId, weekId } = {}) =>
  rawUrl
    .replace(`{{leagueId}}`, leagueId || ESPN_LEAGUE_ID)
    .replace(`{{seasonId}}`, seasonId || ESPN_SEASON_ID)
    .replace(`{{weekId}}`, weekId || ESPN_WEEK_ID);

const Url = {
  API_LEAGUE_SETTINGS:
    'https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/{{seasonId}}/segments/0/leagues/{{leagueId}}',
  API_PLAYERS:
    'https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/{{seasonId}}/players?scoringPeriodId={{weekId}}',
  API_SCORE_ADJUSTMENT:
    'https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/{{seasonId}}/segments/0/leagues/{{leagueId}}/schedule',
  LOGIN: 'http://www.espn.com/login',
  SCOREBOARD:
    'https://lm-api-reads.fantasy.espn.com/football/league/scoreboard?leagueId={{leagueId}}&matchupPeriodId={{weekId}}',
  SETTINGS:
    'https://lm-api-reads.fantasy.espn.com/football/league/settings?leagueId={{leagueId}}&seasonId={{seasonId}}',
};

export { Url, hydrate };
