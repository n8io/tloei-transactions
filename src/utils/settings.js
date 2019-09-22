import { readJson } from 'fs-extra';
import { Path } from 'types/paths';

export const readEspnSettings = () => readJson(Path.SETTINGS_ESPN);
export const readLeagueSettings = () => readJson(Path.SETTINGS_LEAGUE);
