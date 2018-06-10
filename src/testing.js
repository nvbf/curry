import dotenv from "dotenv";
dotenv.config();

import { query } from "./db/db";
import { getTournament } from "./db/tournaments";

const main = async () => {
  const tournament = await getTournament(228);
  console.log(tournament);
};

try {
  main();
} catch (err) {
  console.log("failed");
  console.log(err);
}
