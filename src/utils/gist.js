import { getConfig } from 'config';
import GistClient from 'gist-client';

const { GITHUB_GIST_TOKEN } = getConfig();
const gist = new GistClient();

gist.setToken(GITHUB_GIST_TOKEN);

const create = options => gist.create(options);

export const Gist = {
  create,
};
