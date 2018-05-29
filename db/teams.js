const insertTeam = (
  TurneringsId,
  LagId,
  Spiller_1,
  Spiller_2,
  Melding,
  Klasse,
  Lagnavn,
  LagnavnKort,
  TransactionId
) => `INSERT INTO Pamelding 
(TurneringsId, LagId, Spiller_1, Spiller_2, Melding, Klasse, Lagnavn, LagnavnKort, TransactionId)
VALUES 
(${TurneringsId}, ${LagId}, ${Spiller_1}, ${Spiller_2}, ${Melding}, ${Klasse}, ${Lagnavn}, ${LagnavnKort}, ${TransactionId})`;

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
