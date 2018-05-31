import { query } from "./db";

const pointsQueryAll = () => `Select SpillerId, ProfixioId, TurneringsId, Turneringsnavn, Klasse, Plassering, Poeng, Sesong, Finaledato, Turneringstype, Topn, Foreldet, SortId, RecId
from SpillerPoeng order by SpillerId, Finaledato desc
`;

const pointsQuery = id => `Select SpillerId, ProfixioId, TurneringsId, Turneringsnavn, Klasse, Plassering, Poeng, Sesong, Finaledato, Turneringstype, Topn, Foreldet, SortId, RecId
where SpillerId = ${id} order by finaledato desc`;

const allPointsToATournament = tournmentId => `Select * from SpillerPoeng sp join 
(
Select s.SpillerId from Spillere s join Pamelding p1 on s.spillerId = p1.Spiller_1 where p1.TurneringsId = ${tournmentId}
union all
Select s.SpillerId from Spillere s join Pamelding p2 on s.SpillerId = p2.Spiller_2 where p2.TurneringsId = ${tournmentId}
) t on sp.SpillerId = t.SpillerId
`;

const getPoints = async () => {
  const statement = pointsQueryAll();
  const tournaments = await query(statement);
  return tournaments;
};

const getPoint = async id => {
  const tournament = await query(pointsQuery(id));
  return tournament;
};

export { getPoint, getPoints };
