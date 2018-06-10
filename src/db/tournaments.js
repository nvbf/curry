// @flow
import type {
  Tournament as TournamentFT,
  TournamentClass
} from "../flow-types";

import { query } from "./db";

const tournamentsQuery = () => `select * from Turnering`;

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
  `Select * from Pamelding where TurneringsId = ${TurneringsId} and Klasse = ${Klasse}`;

const tournamentByYearQuery = (sesong: number) => `
select * from Turnering where sesong = ${sesong} order by 1`;

const getTournaments = async () => {
  const tournaments = await query(tournamentsQuery());
  return tournaments;
};

const getTournament = async (id: number): Promise<TournamentFT> => {
  const tournament: TournamentFT = await query(tournamentQuery(id));
  const classInfo = await query(tournmaentClassesQuery(id));
  const classesAsText = classInfo.map(({ klasse }) => klasse).join(",");
  tournament.classesText = classesAsText;
  tournament.classes = classInfo;
  return tournament;
};

export { getTournaments, getTournament };
