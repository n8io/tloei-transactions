import { getConfig } from 'config';
import got from 'got';
import { log } from 'utils/log';

const url = 'https://api.short.io/links';

const shorten = async (longUrl) => {
  const { SHORT_IO_SECRET } = getConfig();

  if (!SHORT_IO_SECRET) {
    return longUrl;
  }

  const response = await got.post(url, {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: SHORT_IO_SECRET
    },
    body: {
      allowDuplicates: false,
      originalURL: longUrl,
      // ttl: 'TTL',
      domain: 'lnk.tloei.com'
    },
    json: true
  });

  const { shortURL: shortUrl } = response.body || {};

  if (!shortUrl) {
    log(`❌ Failed to shorten URL. Returning original URL.`);

    console.dir(response.body, { depth: null });

    return longUrl;
  }

  log(`✅ Successfully shortened URL to ${shortUrl}`);

  return shortUrl;
}

export { shorten };