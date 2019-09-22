import { getConfig } from 'config';
import got from 'got';

export const fetch = async url => {
  const { ESPN_SESSION_COOKIE: tempCookie } = getConfig();

  const cookie = `espn_s2=${tempCookie}; Domain=.espn.com; Path=/`;

  const { body: output } = await got(url, { headers: { cookie }, json: true });

  return output;
};
