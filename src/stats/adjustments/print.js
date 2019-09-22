import { Adjustment } from 'types/adjustment';
import { LeagueMember } from 'types/leagueMember';
import { log } from 'utils/log';

const adjustmentToString = abbrev => adjustment =>
  `${abbrev}: ${Adjustment.adjustementToPrint(adjustment)}`;

const printAdjustments = adjustments => {
  log(`🖨️ Printing adjustments...\n  ${adjustments.join('\n  ')}`);
};

export const print = ({ matchups, settings }) => {
  const adjustments = matchups.reduce((acc, { away, home }) => {
    const { abbrev: aAbbrev } = LeagueMember.findById(settings)(away.teamId);
    const { abbrev: hAbbrev } = LeagueMember.findById(settings)(home.teamId);

    return [
      ...acc,
      ...away.adjustments.map(adjustmentToString(aAbbrev)),
      ...home.adjustments.map(adjustmentToString(hAbbrev)),
    ];
  }, []);

  // eslint-disable-next-line no-console
  adjustments.length > 0 && printAdjustments(adjustments);
};
