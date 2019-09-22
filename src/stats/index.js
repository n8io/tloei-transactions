import { getConfig } from 'config';
import { Matchup } from 'types/matchup';
import { Trophy } from 'types/trophy';
import { log } from 'utils/log';
import { fetch as fetchWeekScores } from '../scores';
import { addAdjustments } from './adjustments';

const { APPLY_TROPHIES, PRINT } = getConfig();

// eslint-disable-next-line no-console
const print = trophies => PRINT && console.log(Trophy.print(trophies));

const logTrophies = async options => {
  log(`📜 Updating trophy log...`);

  const uri = await Trophy.saveGoogle(options);

  log(`✅ Successfully logged trophies to ${uri}`);
};

const saveGist = async options => {
  log(`💾️ Uploading trophy summary...`);

  const uri = await Trophy.saveGist(options);

  log(`✅ Saved trophy summary to ${uri}`);

  return uri;
};

const save = async options => {
  if (!APPLY_TROPHIES) return;

  const summaryUrl = await saveGist(options);

  await logTrophies({ ...options, summaryUrl });
};

const process = async ({ seasonId, settings, weekId }) => {
  const matchups = await fetchWeekScores({ seasonId, settings, weekId });
  const slimMatchups = await Matchup.apiToUi(
    addAdjustments({ matchups, settings })
  );

  const flattened = Matchup.uiToFlattened(settings)(slimMatchups);

  const trophies = [
    {
      key: 'HS_T',
      players: Trophy.calculateTeamHighScores(slimMatchups, 3),
    },
    {
      key: 'HS_OP',
      players: Trophy.calculateOffensivePlayerHighScores(flattened, 3),
    },
    {
      key: 'HS_DP',
      players: Trophy.calculateDefensivePlayerHighScores(flattened, 3),
    },
    {
      key: 'HS_STP',
      players: Trophy.calculateSpecialTeamsPlayerHighScores(flattened, 3),
    },
    {
      key: 'HS_BP',
      players: Trophy.calculateHindsightPlayerHighScores(flattened, 3),
    },
  ];

  await print(trophies);
  await save({ seasonId, trophies, weekId });
};

export { process };
