import { getConfig } from 'config';
import { Adjustment } from 'types/adjustment';
import { hydrate, Url } from 'types/url';
import { log } from 'utils/log';
import { post } from 'utils/post';

const { APPLY_ADJUSTMENTS } = getConfig();

// eslint-disable-next-line max-statements
const apply = async ({ matchups, seasonId, weekId }) => {
  const adjustments = Adjustment.uiToApi(matchups);

  if (!Adjustment.hasValidAdjustments(adjustments)) {
    log(`🚫 No stat adjustments to apply.`);

    return;
  } else if (!APPLY_ADJUSTMENTS) {
    log(
      `⚠️ **** DRY RUN Week ${weekId} stat adjustments were NOT applied *** ️️⚠️`
    );

    return;
  }

  const url = new URL(hydrate(Url.API_SCORE_ADJUSTMENT, { seasonId, weekId }));

  log(`🔢 Applying stat adjustments ${url.href}...`);
  await post(url.href, adjustments);

  log(`👍 Stat adjustments applied`);
};

export { apply };

// [{"away":{"adjustment":0,"adjustmentReason":"","teamId":1},"home":{"adjustment":0,"adjustmentReason":"","teamId":5},"id":3}]
