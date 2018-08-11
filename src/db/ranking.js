import { query } from "./db";

const getRankingListStatement = klasse => `EXEC pGetPointsKlasseTotal
@parKlasse = '${klasse}'
`;

const getRankingList = async klasse => {
  const statement = getRankingListStatement(klasse);
  const rankingList = await query(statement);
  return rankingList;
};

export { getRankingList };
