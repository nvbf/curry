import dotenv from "dotenv";
dotenv.config();

// const TurneringsId = 0;
// const Spiller_1 = 0;
// const Spiller_2 = 0;
// const Klasse = "K";
// const TransactionId = "";

import { query, close } from "../src/db/db";

const insertSP = `EXEC dbo.pInsertPamelding
@parTurneringsId = ${TurneringsId},
@parSpiller_1 = ${Spiller_1},
@parSpiller_2 = ${Spiller_2},
@parKlasse = '${Klasse}',
@parTransactionId = '${TransactionId}'`;

const main = async () => {
  try {
    const result = await query(insertSP);
    console.log("OK");
    console.log(JSON.stringify(result));
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
