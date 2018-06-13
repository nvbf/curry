// @flow
import type {
  Tournament as TournamentFT,
  TournamentKlasse,
  TournamentWithTeams
} from "../flow-types";

import { query } from "./db";

const tournamentsQuery = () => `Select 
TurneringsId as TournamentId,
Navn as name,
Finaledato as endDate,
Sesong as season,
Turneringstype as tournamentType,
TurneringsIdProfixio as tournamentIdProfixio,
KortnavnProfixio as shortNameProfixio,
StartDato as startDate,
Pameldingsfrist as deadline,
Turneringsleder as tournamentDirector,
TurneringEpost as mail,
TurneringTlf as phone,
Memo as description,
Spillested as playerVenue,
Betalingsinfo paymentInfo,
Arrangor as organizer,
Region as region from Turnering`;

const tournamentQueryInTheFuture = () =>
  `Select 
    TurneringsId as TournamentId,
    Navn as name,
    Finaledato as endDate,
    Sesong as season,
    Turneringstype as tournamentType,
    TurneringsIdProfixio as tournamentIdProfixio,
    KortnavnProfixio as shortNameProfixio,
    StartDato as startDate,
    Pameldingsfrist as deadline,
    Turneringsleder as tournamentDirector,
    TurneringEpost as mail,
    TurneringTlf as phone,
    Memo as description,
    Spillested as playerVenue,
    Betalingsinfo paymentInfo,
    Arrangor as organizer,
    Region as region 
  FROM  Turnering
  WHERE Finaledato > GETDATE()
  ORDER BY StartDato ASC	
  `;

const tournamentQuery = (id: number) =>
  `Select 
  TurneringsId as TournamentId,
  Navn as name,
  Finaledato as endDate,
  Sesong as season,
  Turneringstype as tournamentType,
  TurneringsIdProfixio as tournamentIdProfixio,
  KortnavnProfixio as shortNameProfixio,
  StartDato as startDate,
  Pameldingsfrist as deadline,
  Turneringsleder as tournamentDirector,
  TurneringEpost as mail,
  TurneringTlf as phone,
  Memo as description,
  Spillested as playerVenue,
  Betalingsinfo paymentInfo,
  Arrangor as organizer,
  Region as region from Turnering where TurneringsId = ${id}`;

const tournmaentClassesQuery = (id: number) =>
  `Select Klasse as klasse, MaksAntLag as maxNrOfTeams, Pris as price  from TurneringKlasse where TurneringsId = ${id} `;

const participantQuery = (TurneringsId: number, Klasse: TournamentKlasse) =>
  `Select * from Pamelding where TurneringsId = ${TurneringsId} and Klasse = '${Klasse}'`;

const tournamentByYearQuery = (sesong: number) => `
select Select 
TurneringsId as TournamentId,
Navn as name,
Finaledato as endDate,
Sesong as season,
Turneringstype as tournamentType,
TurneringsIdProfixio as tournamentIdProfixio,
KortnavnProfixio as shortNameProfixio,
StartDato as startDate,
Pameldingsfrist as deadline,
Turneringsleder as tournamentDirector,
TurneringEpost as mail,
TurneringTlf as phone,
Memo as description,
Spillested as playerVenue,
Betalingsinfo paymentInfo,
Arrangor as organizer,
Region as region from Turnering where sesong = ${sesong}`;

const getTest = async () => {
  const statement = `SELECT TransactionId, Lagnavn, TurneringsId FROM Pamelding where TransactionId != '' order by TurneringsId`;
  //const statement = `SELECT TOP 10 turneringsId FROM Pamelding`;
  //TransactionId, Lagnavn, TurneringsId //WHERE TransactionId != ''
  // const statement = tournamentQueryInTheFuture();
  console.log(statement);
  const result = await query(statement);
  return result;
};

async function getTournamentStruct(statement: string): Promise<TournamentFT> {
  const tournaments: TournamentFT = await query(statement);
  return tournaments;
}

const getTournament = async (id: number): Promise<TournamentWithTeams> => {
  const tournament: TournamentFT = await query(tournamentQuery(id));
  const classes = await query(tournmaentClassesQuery(id));
  const classesAsText = classes.map(({ klasse }) => klasse).join(",");
  let teams = [];
  const KlasseAsText = classesAsText.split(",");
  const numberOfClasses = KlasseAsText.length;
  for (let a = 0; a < numberOfClasses; a++) {
    const Klasse = KlasseAsText[a];
    const team = await query(participantQuery(id, Klasse));
    teams.push(team);
  }

  // tournament.classesText = classesAsText;
  // tournament.classes = classInfo;
  return Object.assign({}, tournament, { classes, classesAsText, teams });
};

const getTournamentsInTheFuture = getTournamentStruct.bind(
  null,
  tournamentQueryInTheFuture()
);

const getTournaments = getTournamentStruct.bind(null, tournamentsQuery());

export { getTournaments, getTournament, getTournamentsInTheFuture, getTest };
