import { getConfig } from 'config';
import BitlyClient from 'node-bitlyapi';
import { path } from 'ramda';
import { log } from './log';

const {
  BITLY_ACCESS_TOKEN,
  BITLY_APP_CLIENT_ID,
  BITLY_APP_CLIENT_SECRET,
} = getConfig();

const bitly = new BitlyClient({
  /* eslint-disable camelcase */
  client_id: BITLY_APP_CLIENT_ID,
  client_secret: BITLY_APP_CLIENT_SECRET,
  /* eslint-enable camelcase */
});

bitly.setAccessToken(BITLY_ACCESS_TOKEN);

const shorten = longUrl =>
  new Promise((resolve, reject) => {
    bitly.shorten({ longUrl }, (err, raw) => {
      if (err) {
        log(`🛑 Failed to shorten url: ${longUrl}`);

        return reject(err);
      }

      const url = path(['data', 'url'], JSON.parse(raw));

      log(`👍 Url shortened to ${url}`);

      return resolve(url);
    });
  });

export { shorten };
