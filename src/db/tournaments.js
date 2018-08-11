// @flow
import type {
  Tournament as TournamentFT,
  TournamentKlasse,
  TournamentWithTeams
} from "../flow-types";

import debug from "debug";
const log = debug("db:tournaments");
const error = debug("curry:error:db:tournaments");

import { query } from "./db";

const tournamentsQuery = () => `Select 
  t.TurneringsId as tournamentId,
  t.Navn as name,
  t.Finaledato as endDate,
  t.Sesong as season,
  t.Turneringstype as tournamentType,
  t.TurneringsIdProfixio as tournamentIdProfixio,
  t.KortnavnProfixio as shortNameProfixio,
  t.StartDato as startDate,
  t.Pameldingsfrist as deadline,
  t.Turneringsleder as tournamentDirector,
  t.TurneringEpost as mail,
  t.TurneringTlf as phone,
  t.Memo as description,
  t.Spillested as playerVenue,
  Betalingsinfo paymentInfo,
  t.Arrangor as organizer,
  t.Region as region,
  STUFF((
    SELECT ',' + k.Klasse
    FROM TurneringKlasse k
    WHERE k.TurneringsId = t.TurneringsId
    FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(100)'), 1, 1, '')
  as classesAsText
  FROM Turnering t
  WHERE Turneringstype NOT LIKE 'WT%'
  AND Turneringstype NOT LIKE 'CEV%'
  AND Turneringstype NOT LIKE 'CEV%'
  AND Turneringstype NOT LIKE 'FIVB%'
  AND Turneringstype NOT LIKE 'NEVZA%'
  AND sesong = 2017`;

const tournamentQueryInTheFuture = () =>
  `Select 
  t.TurneringsId as tournamentId,
  t.Navn as name,
  t.Finaledato as endDate,
  t.Sesong as season,
  t.Turneringstype as tournamentType,
  t.TurneringsIdProfixio as tournamentIdProfixio,
  t.KortnavnProfixio as shortNameProfixio,
  t.StartDato as startDate,
  t.Pameldingsfrist as deadline,
  t.Turneringsleder as tournamentDirector,
  t.TurneringEpost as mail,
  t.TurneringTlf as phone,
  t.Memo as description,
  t.Spillested as playerVenue,
  Betalingsinfo paymentInfo,
  t.Arrangor as organizer,
  t.Region as region,
  STUFF((
    SELECT ',' + k.Klasse
    FROM TurneringKlasse k
    WHERE k.TurneringsId = t.TurneringsId
    FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(100)'), 1, 1, '')
  as classesAsText
  FROM Turnering t
  WHERE Turneringstype NOT LIKE 'WT%'
  AND Turneringstype NOT LIKE 'CEV%'
  AND Turneringstype NOT LIKE 'CEV%'
  AND Turneringstype NOT LIKE 'FIVB%'
  AND Turneringstype NOT LIKE 'NEVZA%'
  AND Finaledato > GETDATE()
  ORDER BY StartDato ASC
  `;

const tournamentQueryThatIsFinished = () =>
  `Select 
  t.TurneringsId as tournamentId,
  t.Navn as name,
  t.Finaledato as endDate,
  t.Sesong as season,
  t.Turneringstype as tournamentType,
  t.TurneringsIdProfixio as tournamentIdProfixio,
  t.KortnavnProfixio as shortNameProfixio,
  t.StartDato as startDate,
  t.Pameldingsfrist as deadline,
  t.Turneringsleder as tournamentDirector,
  t.TurneringEpost as mail,
  t.TurneringTlf as phone,
  t.Memo as description,
  t.Spillested as playerVenue,
  Betalingsinfo paymentInfo,
  t.Arrangor as organizer,
  t.Region as region,
  STUFF((
    SELECT ',' + k.Klasse
    FROM TurneringKlasse k
    WHERE k.TurneringsId = t.TurneringsId
    FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(100)'), 1, 1, '')
  as classesAsText
  FROM Turnering t
  WHERE Turneringstype NOT LIKE 'WT%'
  AND Turneringstype NOT LIKE 'CEV%'
  AND Turneringstype NOT LIKE 'CEV%'
  AND Turneringstype NOT LIKE 'FIVB%'
  AND Turneringstype NOT LIKE 'NEVZA%'
  AND Finaledato <= GETDATE()
  ORDER BY Finaledato DESC
  `;

const tournamentQuery = (id: number) =>
  `Select 
  TurneringsId as tournamentId,
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
  `Select Klasse as klasse, MaksAntLag as maxNrOfTeams, Pris as price  from TurneringKlasse where TurneringsId = ${id}`;

const participantQuery = (TurneringsId: number, Klasse: TournamentKlasse) =>
  `Select Lagnavn, Spiller_1, Spiller_2, PoengS1, PoengS2, PoengLag  from Pamelding where TurneringsId = ${TurneringsId} and Klasse = '${Klasse}'`;

const tournamentByYearQuery = (sesong: number) => `
select Select 
TurneringsId as tournamentId,
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
  //@parDato = '2017-12-12'
  const statement = `EXEC pGetPointsKlasseTotal
  @parKlasse = 'M'
  `;

  console.log(statement);
  const result = await query(statement);
  return result;
};

async function getTournamentStruct(statement: string): Promise<TournamentFT> {
  log(`running: ${statement}`);
  const tournaments: TournamentFT = await query(statement);
  log(`done running statement`);
  return tournaments;
}

const getTournament = async (id: number): Promise<TournamentWithTeams> => {
  const tournamentRecordSet = await query(tournamentQuery(id));
  if (tournamentRecordSet.length === 0) {
    return [];
  }
  const tournament: TournamentFT = tournamentRecordSet[0];
  const classes = await query(tournmaentClassesQuery(id));
  const classesAsText = classes.map(({ klasse }) => klasse).join(",");
  let teams = [];
  const KlasseAsText = classesAsText.split(",");
  const numberOfClasses = KlasseAsText.length;
  for (let a = 0; a < numberOfClasses; a++) {
    const Klasse = KlasseAsText[a].toLowerCase();
    const teams = await query(participantQuery(id, Klasse));
    
    //TODO: how can this happen. quick fix! 
    if(classes[a]) {
      classes[a].teams = teams;
    } else {
      error(`No classes whit key ${a} ?, Classes: ${JSON.stringify(classes)}`)
    }
  }

  // tournament.classesText = classesAsText;
  // tournament.classes = classInfo;

  return Object.assign({}, tournament, { classes, classesAsText });
};

const getTournamentsInTheFuture = getTournamentStruct.bind(
  null,
  tournamentQueryInTheFuture()
);

const getTournamentsThatIsFinished = getTournamentStruct.bind(
  null,
  tournamentQueryThatIsFinished()
);

const getTournaments = getTournamentStruct.bind(null, tournamentsQuery());

export {
  getTournaments,
  getTournament,
  getTournamentsInTheFuture,
  getTournamentsThatIsFinished,
  getTest
};
