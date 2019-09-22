import { getConfig } from 'config';
import GoogleSpreadsheet from 'google-spreadsheet';
import { auth } from './auth';
import { workbook, workbookUrl } from './workbook';
import { worksheet } from './worksheet';

const { GOOGLE_DOC_ID } = getConfig();

const doc = new GoogleSpreadsheet(GOOGLE_DOC_ID);

const initialize = async () => {
  try {
    await auth(doc);

    return doc;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);

    throw err;
  }
};

export { initialize, workbook, workbookUrl, worksheet };
