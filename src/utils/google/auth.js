import { log } from 'utils/log';
import secrets from '../../../client_secret';

const auth = doc =>
  new Promise((resolve, reject) => {
    log('🔐 Authenticating Google Sheets access...');
    doc.useServiceAccountAuth(secrets, err => {
      if (err) {
        log('🔒 Failed access');

        return reject(err);
      }

      log('🔓 Access granted');
      return resolve();
    });
  });

export { auth };
