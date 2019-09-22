import { getConfig } from 'config';
import got from 'got';

export const post = async (url, body) => {
  const { ESPN_SESSION_COOKIE: tempCookie } = getConfig();

  const cookie = `espn_s2=${tempCookie}; Domain=.espn.com; Path=/`;

  await got.post(url, {
    body,
    headers: { 'content-type': 'application/json', cookie },
    json: true,
  });
};
