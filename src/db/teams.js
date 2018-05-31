import { query } from "./db";

const insertTeam = ({
  tournamentId,
  playerId1,
  playerId2,
  klasse,
  message,
  transactionId
}) => `INSERT INTO Pamelding 
(TurneringsId, LagId, Spiller_1, Spiller_2, Melding, Klasse, Lagnavn, LagnavnKort, TransactionId)
VALUES 
(${tournamentId}, ${LagId}, ${playerId1}, ${playerId2}, ${message}, ${klasse}, ${Lagnavn}, ${LagnavnKort}, ${transactionId})`;

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
  message,
  transactionId
}) => {
  const tournament = await query(
    insertTeam({
      tournamentId,
      playerId1,
      playerId2,
      klasse,
      message,
      transactionId
    })
  );
  return tournament;
};

export { insertTeamFunc as insertTeam };
