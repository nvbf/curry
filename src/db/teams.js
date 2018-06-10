import { query } from "./db";

const insertTeam = ({
  tournamentId,
  playerId1,
  playerId2,
  klasse,
  transactionId
}) => `EXEC dbo.pInsertPamelding 
  @parTurneringsId = ${tournamentId}, 
  @parSpiller_1 = ${playerId1}, 
  @parSpiller_2 = ${playerId2}, 
  @parKlasse = '${klasse}', 
  @parTransactionId = '${transactionId}'
`;

const changeTeam = (
  Spiller_1,
  Spiller_2,
  Melding,
  Klasse,
  Lagnavn,
  LagnavnKort,
  TransactionId,
  TurneringsId,
  LagId
) => `Update Pamelding set Spiller_1 = ${Spiller_1}, Spiller_2 = ${Spiller_2}, Melding = ${Melding}, Klasse = ${Klasse}, Lagnavn = ${Lagnavn}, LagnavnKort = ${LagnavnKort}, TransactionId = ${TransactionId}
where TurneringsId = ${TurneringsId} and LagId = ${LagId}`;

const insertTeamFunc = async ({
  tournamentId,
  playerId1,
  playerId2,
  klasse,
  transactionId
}) => {
  const tournament = await query(
    insertTeam({
      tournamentId,
      playerId1,
      playerId2,
      klasse,
      transactionId
    })
  );
  return tournament;
};

export { insertTeamFunc as insertTeam };
