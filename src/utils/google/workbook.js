import { getConfig } from 'config';
import { log } from 'utils/log';

const { GOOGLE_DOC_ID } = getConfig();

let info = null;

const workbookUrl = () =>
  `https://docs.google.com/spreadsheets/d/${GOOGLE_DOC_ID}`;

const workbook = doc =>
  info
    ? info
    : new Promise((resolve, reject) => {
        log('👐 Fetching sheet info...');
        doc.getInfo((err, data) => {
          if (err) {
            log('🛑 Failed to retrieve sheet info');

            return reject(err);
          }

          info = data;

          log('👍 Sheet info received');
          return resolve(data);
        });
      });

export { workbook, workbookUrl };
