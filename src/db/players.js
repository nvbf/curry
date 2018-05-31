import { query } from "./db";

const playersQuery = () => `SELECT SpillerId, PersonId, Idrettsnr, ProfixioId, Fornavn, Etternavn, Klasse, Kjonn, FDato, Adresse1, Adresse2, Postnr, Poststed, Epost, Telefon, RecId
FROM Spillere`;

const playerQuery = id => `Select s.SpillerId, s.ProfixioId, (s.Fornavn + ' ' + s.Etternavn) as Navn, s.FDato, s.Kjonn,
p.Turneringsnavn, p.Klasse, p.Plassering, p.Poeng, p.Topn, p.Foreldet, p.Turneringstype
from Spillere s
join SpillerPoeng p on s.SpillerId = p.SpillerId
where s.SpillerId = ${id}`;

const insertQuery = (
  SpillerId,
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
) => `INSERT INTO Spillere
  (SpillerId, Fornavn, Etternavn, FDato, Kjonn, Adresse1, Adresse2, Postnr, Poststed, Epost, Telefon)
VALUES 
  (${SpillerId}, ${Fornavn}, ${Etternavn}, ${FDato}, ${Kjonn}, ${Adresse1}, ${Adresse2}, ${Postnr}, ${Poststed}, ${Epost}, ${Telefon})`;

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
