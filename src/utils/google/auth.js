import { log } from 'utils/log';
import secrets from '../../../client_secret';

const auth = async doc => {
  log('🔐 Authenticating Google Sheets access...');

  try {
    await doc.useServiceAccountAuth(secrets);
    await doc.loadInfo();
  } catch (err) {
    log('🔒 Failed access', err);

    throw err;
  }

  log('🔓 Access granted');
  return doc;
};

export { auth };
