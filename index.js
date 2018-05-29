import express from "express";
import { getTournaments, getTournament } from "./db/tournaments.js";

const app = express();

app.get("/tournaments", async function(req, res) {
  const result = await getTournaments();
  console.log(result);
  res.json(result);
});

app.get("/tournaments/:id", async function(req, res) {
  const result = await getTournament(req.params.id);
  console.log(result);
  res.json(result);
});

app.listen(process.env.PORT || 3000);
