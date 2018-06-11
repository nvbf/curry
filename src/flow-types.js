// @flow

export type TournamentType = "RT Open" | "NT Open" | "NT Master" | "RT Open";

export type TournamentKlasse =
  | "K"
  | "M"
  | "GUnumber"
  | "GUnumber"
  | "GUnumber"
  | "JUnumber"
  | "JUnumber"
  | "JUnumber";

export type TournamentKlasseInfo = {
  klasse: TournamentKlasse,
  price: number,
  maxNrOfTeams: number
};

export type Team = {
  teamId: number,
  klasse: TournamentKlasse,
  teamName: string,
  teamNameShort: string,
  playernumberId: number,
  playernumberId: number,
  playernumberPoints: number,
  playernumberPoints: number,
  teamPoints: number
};

export type Tournament = {
  id: number,
  name: string,
  tournamentType: TournamentType,
  season: number,
  endDate: string,
  tournamentIdProfixio: number,
  shortNameProfixio: string,
  startDate: string,
  startTime: string,
  endTime: string,
  deadline: string,
  tournamentDirector: string,
  email: string,
  phone: string,
  classesText: Array<string>,
  classes: Array<TournamentKlasseInfo>,
  description: string,
  playerVenue: string,
  paymentInfo: string
};

export type TournamentWithTeams = Tournament & { teams: Array<Team> };
