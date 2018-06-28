import dotenv from "dotenv";
dotenv.config();

import { query } from "./db/db";
import { getTest } from "./db/tournaments";

const main = async () => {
  const tournament = await getTest();
  console.log(tournament);
};

try {
  main();
} catch (err) {
  console.log("failed");
  console.log(err);
}
