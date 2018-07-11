import { query } from "./db";

const insertTeam = ({
  tournamentId,
  playerId1,
  playerId2,
  klasse,
  transactionId,
  email = ""
}) => `EXEC dbo.pInsertPamelding 
  @parTurneringsId = ${tournamentId}, 
  @parSpiller_1 = ${playerId1}, 
  @parSpiller_2 = ${playerId2}, 
  @parKlasse = '${klasse}', 
  @parTransactionId = '${transactionId}',
  @parEpost = '${email}'
`;

const insertTeamFunc = async ({
  tournamentId,
  playerId1,
  playerId2,
  klasse,
  transactionId,
  email
}) => {
  const tournament = await query(
    insertTeam({
      tournamentId,
      playerId1,
      playerId2,
      klasse,
      transactionId,
      email
    })
  );
  return tournament;
};

export { insertTeamFunc as insertTeam };
