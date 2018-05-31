import sql from "mssql";
import debug from "debug";
import { rollbar } from "./../rollbar";

const error = debug("brine:error:db");

let init = false;
let connected = false;
let pool = null;

export async function query(query) {
  if (!init) {
    init = true;
    console.log("INIT");
    pool = await sql.connect(process.env.CONNECTION_STRING);
    connected = true;
  }
  while (!connected) {
    await new Promise((resovle, reject) => {
      initializeFinished(resovle, reject);
    });
  }
  const result = await pool.request().query(query);
  return result.recordsets;
}

sql.on("error", err => {
  rollbar.warn(err);
  error("SQL ON ERROR:", err);
});

function initializeFinished(resolve, reject) {
  if (connected) {
    return resolve(true);
  }
  setTimeout(initializeFinished.bind(null, resolve, reject), 10);
}
