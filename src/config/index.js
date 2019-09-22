import dotEnv from 'dotenv-safe';
import { evolve, isNil, pick, pipe, prop } from 'ramda';
import { stringToBool } from 'utils/bool';
import { number } from 'utils/number';

dotEnv.config({
  allowEmptyValues: true,
});

// eslint-disable-next-line no-process-env
const config = Object.keys(process.env)
  .filter(
    k =>
      k.startsWith('ESPN_') ||
      [
        'APPLY_TRANSACTIONS',
        'BITLY_ACCESS_TOKEN',
        'BITLY_APP_CLIENT_ID',
        'BITLY_APP_SECRET',
        'DEBUG',
        'GOOGLE_DOC_ID',
        'PREVIOUS_SEASON',
        'PREVIOUS_WEEK',
        'PRINT',
        'SHOW_CONFIG',
      ].indexOf(k) > -1
  )
  // eslint-disable-next-line no-process-env
  .reduce((acc, key) => ({ ...acc, [key]: process.env[key] }), {});

const getConfig = () =>
  pipe(
    props => ({
      APPLY_TRANSACTIONS: false,
      BITLY_ACCESS_TOKEN: '',
      BITLY_APP_CLIENT_ID: '',
      BITLY_APP_SECRET: '',
      DEBUG: '',
      GOOGLE_DOC_ID: '',
      PREVIOUS_SEASON: false,
      PREVIOUS_WEEK: false,
      PRINT: false,
      SHOW_CONFIG: false,
      ...props,
    }),
    evolve({
      APPLY_TRANSACTIONS: stringToBool,
      ESPN_LEAGUE_ID: number(),
      ESPN_SEASON_ID: number(),
      ESPN_WEEK_ID: number(),
      PREVIOUS_WEEK: stringToBool,
      PRINT: stringToBool,
      SHOW_CONFIG: stringToBool,
    })
  )(config);

const validate = cfg => {
  const requiredKeys = [
    'ESPN_LEAGUE_ID',
    'BITLY_ACCESS_TOKEN',
    'BITLY_APP_CLIENT_ID',
    'BITLY_APP_SECRET',
    'ESPN_SESSION_COOKIE',
    'GOOGLE_DOC_ID',
  ];

  const invalidKeys = requiredKeys.filter(key => isNil(prop(key, cfg)));

  if (invalidKeys.length > 0) {
    const msg = `Config is missing required items: ${invalidKeys.join(', ')}`;

    throw new Error(msg);
  }

  cfg.SHOW_CONFIG &&
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(pick(requiredKeys, cfg), null, 2));
};

export { getConfig, validate };
