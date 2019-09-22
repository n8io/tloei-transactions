import { contains, flatten, pick } from 'ramda';
import { Bonus } from 'types/bonus';
import { BonusAmount } from 'types/bonusAmount';
import { LineupSlot } from 'types/lineupSlots';
import { Player } from 'types/player';
import { Stat } from 'types/stat';

const calculateBonuses = player => {
  const bonuses = [];

  const tackles = player.stats[Stat.TKS.toString()] || 0;
  const assists = player.stats[Stat.TKA.toString()] || 0;

  const tacklesBonus = tackles * BonusAmount.DL_TKS;

  tacklesBonus &&
    bonuses.push({
      bonus: tacklesBonus,
      player: Player.apiToUi(player),
      type: Bonus.DL_TKS,
    });

  const assistsBonus = assists * BonusAmount.DL_AST;

  assistsBonus &&
    bonuses.push({
      bonus: assistsBonus,
      player: Player.apiToUi(player),
      type: Bonus.DL_AST,
    });

  return bonuses;
};

// eslint-disable-next-line complexity, max-statements
export const adjustments = settings => players => {
  const position =
    // eslint-disable-next-line new-cap
    pick(['id', 'eligiblePositions'], LineupSlot.DL(settings));

  const isPositionEligible = ({ defaultPositionId }) =>
    contains(defaultPositionId, position.eligiblePositions);

  const eligiblePlayers = players.filter(isPositionEligible);
  const bonuses = eligiblePlayers.map(calculateBonuses);

  return flatten(bonuses);
};
