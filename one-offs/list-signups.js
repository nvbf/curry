import dotenv from "dotenv";
dotenv.config();

import { query, close } from "../src/db/db";

const tournamentId = process.argv[2];
const klasse = process.argv[3];

if (!tournamentId) {
  console.log("Please spesify tournament as the first parameter");
  process.exit(-1);
}

if (!klasse) {
  console.log("Please spesify klasse as the second parameter");
  process.exit(-1);
}

const insertSP = `
Select * from Pamelding where Klasse = '${klasse}' and TurneringsId = ${tournamentId}`;

const main = async () => {
  try {
    const result = await query(insertSP);
    const resultString = JSON.stringify(result);
    const results = JSON.parse(resultString);
    const values = results.map(res => {
      return [
        res["Spiller_1"],
        res["Spiller_2"],
        res["Lagnavn"],
        res["epost"],
        res["TransactionId"]
      ];
    });
    console.log("Result:");
    console.table(values);
  } catch (err) {
    console.log("ERROR");
    console.log(err.name);
    console.log(err.message);
    console.log(`${err.filename}:${err.lineNumber}:${err.columnNumber}`);
    console.log(err.stack);
    console.log(JSON.stringify(err));
  } finally {
    close();
  }
};

main();
