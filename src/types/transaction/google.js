import { addIndex, has, map, prop, sortBy } from 'ramda';
import { initialize, workbookUrl, worksheet } from 'utils/google';
import { log } from 'utils/log';

const getRows = sheet =>
  new Promise((resolve, reject) => {
    sheet.getRows(1, (err, rows) => {
      if (err) {
        log('🛑 Failed to fetch rows');

        return reject(err);
      }

      return resolve(rows);
    });
  });

const makeColumnUpdater = row => (name, value) => {
  if (!has(name, row)) return;

  row[name] = value;
};

const mapIndexed = addIndex(map);

// eslint-disable-next-line max-statements
const makeTransactionCountsLogger = rows => async (transactionCount, index) => {
  const { counts, abbrev: team } = transactionCount;
  const row = rows[index];
  const update = makeColumnUpdater(row);

  update('owner', team);
  update('adds', counts.adds);
  update('drops', counts.drops);
  update('injuredreserves', counts.injuredReserves);
  update('trades', counts.trades);

  await row.save();

  return Promise.resolve();
};

const save = async transactionCounts => {
  const doc = await initialize();
  const sheet = await worksheet(doc, 'Summary');
  const rows = await sheet.getRows();
  const sorted = sortBy(prop('abbrev'), transactionCounts);
  const logTransactionCount = makeTransactionCountsLogger(rows);

  const promises = mapIndexed(logTransactionCount, sorted);

  await Promise.all(promises);

  return workbookUrl();
};

export { save };
