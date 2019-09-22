import { getConfig, validate } from 'config';
import { Season } from 'types/season';
import { process } from './process';

(async () => {
  try {
    const config = getConfig();

    validate(config);

    const seasonId = await Season.current();

    await process({ seasonId });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
})();
