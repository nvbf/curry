import express from "express";
import debug from "debug";
import dotenv from "dotenv";

import { getTournaments, getTournament } from "./db/tournaments";
import { getPoint, getPoints } from "./db/points";
import { getPlayers, getPlayer } from "./db/players";
import { insertTeam } from "./db/teams";
import { rollbar } from "./rollbar";

dotenv.config();

const log = debug("brine:index");
const error = debug("brine:error:index");

const app = express();

const tournamentsHandler = async function(req, res) {
  const { TurneringsId: tournamentId } = req.query;
  if (tournamentId) {
    tournamentById(tournamentId, req);
    return;
  }
  const result = await getTournaments();
  res.json(result);
};

const errorHandler = async function(handler, req, res) {
  try {
    handler(req, res);
  } catch (err) {
    // duplicate since I use rollbar errorHandler  or?
    rollbar.error(err);
    error(`Error in ${handler.name}`);
    error(`Error in ${handler.name}`);
    req.status(503).json({
      error: "Internal server error",
      status: "error"
    });
  }
};

app.get("/tournaments", errorHandler.bind(null, tournamentsHandler));

const tournamentByIdHandler = async function(req, res) {
  const result = await getTournament(req.params.id);
  res.json(result);
};

const tournamentById = async function(id, res) {
  const result = await getTournament(id);
  res.json(result);
};

app.get("/tournaments/:id", errorHandler.bind(null, tournamentByIdHandler));

const pointsById = async (id, res) => {
  const result = await getPoint(id);
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

app.get("/points", errorHandler.bind(null, pointsHandler));

const pointsByIdHandler = async function(req, res) {
  const { id } = req.params;
  pointsById(id, res);
};

app.get("/points/:id", errorHandler.bind(null, pointsByIdHandler));

const playersHandler = async function(req, res) {
  const result = await getPlayers();
  res.json(result);
};

app.get("/players", errorHandler.bind(null, playersHandler));

const playersByIdHandler = async function(req, res) {
  const result = await getPlayer(req.params.id);
  res.json(result);
};

app.get("/players/:id", errorHandler.bind(null, playersByIdHandler));

const registerTeamHandler = async function(req, res) {
  const {
    TournamentId: tournamentId,
    Spiller_1: playerId1,
    Spiller_2: playerId2,
    Klasse: klasse,
    Melding: message,
    TransactionId: transactionId
  } = req.params;

  const result = await insertTeam({
    tournamentId,
    playerId1,
    playerId2,
    klasse,
    message,
    transactionId
  });
  res.json(result);
};

app.post("/RegisterTeam", errorHandler.bind(null, registerTeamHandler));

app.use(rollbar.errorHandler());

app.listen(process.env.PORT || 3000);
