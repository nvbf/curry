import { query } from "./db";

const playersQuery = () =>
  `SELECT SpillerId, PersonId, ProfixioId, Fornavn, Etternavn, Klasse, Kjonn FROM Spillere`;

const playerQuery = id => `Select s.SpillerId, s.ProfixioId, (s.Fornavn + ' ' + s.Etternavn) as Navn, s.FDato, s.Kjonn,
p.Turneringsnavn, p.Klasse, p.Plassering, p.Poeng, p.Topn, p.Foreldet, p.Turneringstype
from Spillere s
join SpillerPoeng p on s.SpillerId = p.SpillerId
where s.SpillerId = ${id}`;

// FDato in format: 1990-01-01
const insertQuery = (
  Fornavn,
  Etternavn,
  FDato,
  Kjonn,
  Adresse1,
  Adresse2,
  Postnr,
  Poststed,
  Epost,
  Telefon
) => `pInsertSpiller
@parFornavn = '${Fornavn}',
@parEtternavn = '${Etternavn}',
@parKjonn = '${Kjonn}',
@parFDato = '${FDato}', 
@parAdresse1 = '${Adresse1}',
@parAdresse2 = '${Adresse2}',
@parPostnr = '${Postnr}',
@parPoststed = '${Poststed}',
@parEpost = '${Epost}',
@parTelefon = '${Telefon}'`;

const getPlayers = async () => {
  const statement = playersQuery();
  const players = await query(statement);
  return players;
};

const getPlayer = async id => {
  const player = await query(playerQuery(id));
  return player;
};

export { getPlayers, getPlayer };
