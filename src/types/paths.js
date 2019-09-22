import { join } from 'path';

const DIR_SETTINGS = join(__dirname, '../data');
const SETTINGS_ESPN = join(DIR_SETTINGS, 'espn.json');
const SETTINGS_LEAGUE = join(DIR_SETTINGS, 'league.json');

export const Path = {
  SETTINGS_ESPN,
  SETTINGS_LEAGUE,
  TEMP_DIR: DIR_SETTINGS,
};
