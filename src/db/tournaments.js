import { query } from "./db";

const tournamentsQuery = () => `select * from Turnering`;

// TODO: TurneringsId could be wrong here
const tournamentQuery = id =>
  `select * from Turnering where TurneringsId = ${id}`;

const tournmaentClassesQuery = id =>
  `Select * from TurneringKlasse where TurneringsId = ${id} `;

const participantQuery = (TurneringsId, Klasse) =>
  `Select * from Pamelding where TurneringsId = ${TurneringsId} and Klasse = ${Klasse}`;

const tournamentByYearQuery = sesong => `
select * from Turnering where sesong = ${sesong} order by 1`;

const getTournaments = async () => {
  const statement = tournamentsQuery();
  const tournaments = await query(statement);
  return tournaments;
};

const getTournament = async id => {
  const tournament = await query(tournamentQuery(id));
  return tournament;
};

export { getTournaments, getTournament };
