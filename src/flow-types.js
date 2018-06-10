// @flow

export type TournamentType = "RT Open" | "NT Open" | "NT Master" | "RT Open";

export type TournamentClass =
  | "K"
  | "M"
  | "GU19"
  | "GU17"
  | "GU15"
  | "JU19"
  | "JU17"
  | "JU15";

export type TournamentClassInfo = {
  klasse: TournamentClass,
  price: number,
  maxNrOfTeams: number
};

export type Tournament = {
  id: number,
  name: "string",
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
  classes: Array<TournamentClassInfo>,
  description: string,
  playerVenue: string,
  paymentInfo: string
};
