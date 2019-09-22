import { Transaction } from 'types/transaction';
import { log } from 'utils/log';

const process = async ({ seasonId }) => {
  const transactionCounts = await Transaction.fetch({ seasonId });

  log(`📜 Updating transaction log...`);

  const uri = await Transaction.save(transactionCounts);

  log(`✅ Successfully logged transaction to ${uri}`);
};

export { process };
