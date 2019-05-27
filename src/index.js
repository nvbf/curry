import express from "express";
import debug from "debug";
import dotenv from "dotenv";
import routeCache from "route-cache";

import {
  getTournaments,
  getTournament,
  getTournamentsThatIsFinished
} from "./db/tournaments";

import { getRankingList } from "./db/ranking";
import { getPoint, getPoints, getAllPointsToATournament } from "./db/points";
import { getPlayers, getPlayer } from "./db/players";
import { insertTeam } from "./db/teams";
import { rollbar } from "./rollbar";
import { getTournamentsInTheFuture } from "./db/tournaments";

dotenv.config();

const log = debug("curry:index");
const error = debug("curry:error:index");

const app = express();
app.use(express.json());

const tournamentsHandler = async function(req, res) {
  const result = await getTournaments();

  if (!result || (Array.isArray(result) && result.length === 0)) {
    res.status(404).json({});
    return;
  }

  res.json(result);
};

const rankingListHandler = async function(req, res) {
  const result = await getRankingList(req.params.klasse.toUpperCase());
  if (!result || (Array.isArray(result) && result.length === 0)) {
    res.status(404).json({});
    return;
  }

  const length = req.params.length || 10;
  const limitedResult = result.slice(0, length);

  res.json(limitedResult);
};

const tournamentsInTheFutureHandler = async function(req, res) {
  const result = await getTournamentsInTheFuture();

  if (!result || (Array.isArray(result) && result.length === 0)) {
    res.status(404).json({});
    return;
  }

  res.json(result);
};

const tournamentsThatIsFinishedHandler = async function(req, res) {
  const result = await getTournamentsThatIsFinished();

  if (!result || (Array.isArray(result) && result.length === 0)) {
    res.status(404).json({});
    return;
  }

  res.json(result);
};

const errorHandler = async function(handler, req, res) {
  try {
    await handler(req, res);
  } catch (err) {
    // TODO: duplicate since I use rollbar errorHandler  or?
    rollbar.error(err);
    error(err);
    error(`Error in ${handler.name}`);
    req.status(503).json({
      error: "Internal server error",
      status: "error"
    });
  }
};

app.get(
  "/ranking/:klasse/:length",
  routeCache.cacheSeconds(60 * 60),
  errorHandler.bind(null, rankingListHandler)
);

app.get(
  "/tournaments/future",
  routeCache.cacheSeconds(60 * 60),
  errorHandler.bind(null, tournamentsInTheFutureHandler)
);

app.get(
  "/tournaments/finished",
  routeCache.cacheSeconds(60 * 60),
  errorHandler.bind(null, tournamentsThatIsFinishedHandler)
);

const tournamentResultById = async (req, res) => {
  const tournamentId = req.params.id;
  log(req.params);
  const result = await getAllPointsToATournament(tournamentId);
  res.json(result);
};

app.get(
  "/tournaments/:id/results",
  errorHandler.bind(null, tournamentResultById)
);

const tournamentByIdHandler = async function(req, res) {
  const result = await getTournament(req.params.id);
  res.json(result);
};

app.get(
  "/tournaments/:id",
  routeCache.cacheSeconds(30),
  errorHandler.bind(null, tournamentByIdHandler)
);

const pointsById = async (id, res) => {
  const result = await getPoint(id);
  res.json(result);
};

app.get(
  "/tournaments",
  routeCache.cacheSeconds(60 * 60),
  errorHandler.bind(null, tournamentsHandler)
);

const tournamentById = async function(id, res) {
  const result = await getTournament(id);
  res.json(result);
};

const pointsHandler = async function(req, res) {
  const { SpillerId: id } = req.query;
  if (id) {
    pointsById(id, res);
  } else {
    const result = await getPoints();
    res.json(result);
  }
};

app.get(
  "/points",
  routeCache.cacheSeconds(60 * 60),
  errorHandler.bind(null, pointsHandler)
);

const pointsByIdHandler = async function(req, res) {
  const { id } = req.params;
  pointsById(id, res);
};

app.get(
  "/points/:id",
  routeCache.cacheSeconds(60 * 60),
  errorHandler.bind(null, pointsByIdHandler)
);

const playersHandler = async function(req, res) {
  const result = await getPlayers();
  res.json(result);
};

app.get(
  "/players",
  routeCache.cacheSeconds(30),
  errorHandler.bind(null, playersHandler)
);

const playersByIdHandler = async function(req, res) {
  const result = await getPlayer(req.params.id);
  res.json(result);
};

app.get(
  "/players/:id",
  routeCache.cacheSeconds(30),
  errorHandler.bind(null, playersByIdHandler)
);

const registerTeamHandler = async function(req, res) {
  const {
    TurneringsId: tournamentId,
    Spiller_1: playerId1,
    Spiller_2: playerId2,
    Klasse: klasse,
    TransactionId: transactionId,
    email
  } = req.body;

  const result = await insertTeam({
    tournamentId,
    playerId1,
    playerId2,
    klasse,
    transactionId,
    email
  });

  try {
    routeCache.removeCache('/tournaments/' + tournamentId);
  }
  catch (err) {
    log(`Error clearing cache ${err}`);
  }

  res.json(result);
};

app.post("/RegisterTeam", errorHandler.bind(null, registerTeamHandler));

app.use(rollbar.errorHandler());

app.listen(process.env.PORT || 3000, () =>
  console.log(`Server started on port ${process.env.PORT || 3000}`)
);

process.on("unhandledRejection", reason => {
  rollbar.error("unhandledRejection", reason);
  process.exit(-1);
});
