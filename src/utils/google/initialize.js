import { getConfig } from 'config';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { auth } from './auth';

const { GOOGLE_DOC_ID } = getConfig();

const initialize = () => {
  const doc = new GoogleSpreadsheet(GOOGLE_DOC_ID);

  try {
    return auth(doc);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);

    throw err;
  }
};

export { initialize };
