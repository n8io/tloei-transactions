import { contains, flatten, pick } from 'ramda';
import { Bonus } from 'types/bonus';
import { BonusAmount } from 'types/bonusAmount';
import { LineupSlot } from 'types/lineupSlots';
import { Player } from 'types/player';
import { Stat } from 'types/stat';

const calculateBonuses = player => {
  const bonuses = [];
  const receptions = player.stats[Stat.REC.toString()] || 0;
  const receivingYards = player.stats[Stat.REC_YDS.toString()] || 0;

  const receptionBonus = receptions * BonusAmount.TE_REC;

  receptionBonus &&
    bonuses.push({
      bonus: receptionBonus,
      player: Player.apiToUi(player),
      type: Bonus.TE_REC,
    });

  const receivingYardsBonus = receivingYards * BonusAmount.TE_REC_YDS;

  receivingYardsBonus &&
    bonuses.push({
      bonus: receivingYardsBonus,
      player: Player.apiToUi(player),
      type: Bonus.TE_REC_YDS,
    });

  return bonuses;
};

// eslint-disable-next-line complexity, max-statements
export const adjustments = settings => players => {
  const position =
    // eslint-disable-next-line new-cap
    pick(['id', 'eligiblePositions'], LineupSlot.TE(settings));

  const isPositionEligible = ({ defaultPositionId }) =>
    contains(defaultPositionId, position.eligiblePositions);

  const eligiblePlayers = players.filter(isPositionEligible);
  const bonuses = eligiblePlayers.map(calculateBonuses);

  return flatten(bonuses);
};
