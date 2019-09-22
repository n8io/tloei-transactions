export const memberMatchupIdsByWeek = (members, weekId) => {
  const matchups = members.length / 2;

  return [...Array(matchups).keys()].map(
    x => x + weekId * matchups - (matchups - 1)
  );
};
