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

// TODO: TurneringsId could be wrong here
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

const participantQuery = (TurneringsId: number, Klasse: TournamentClass) =>
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
Region as region from Turnering where sesong = ${sesong} order by 1`;

const getTournaments = async () => {
  const tournaments = await query(tournamentsQuery());
  return tournaments;
};

const getTest = async () => {
  const statement = participantQuery(254, "K");
  console.log(statement);
  const result = await query(statement);
  return result;
};

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

export { getTournaments, getTournament, getTest };
