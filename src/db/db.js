import sql from "mssql";
import debug from "debug";
import { rollbar } from "./../rollbar";

const error = debug("curry:error:db");

let init = false;
let connected = false;
let pool = null;

export async function query(query) {
  if (!init) {
    init = true;
    pool = await sql.connect(process.env.CONNECTION_STRING);
    connected = true;
  }
  while (!connected) {
    await new Promise((resovle, reject) => {
      initializeFinished(resovle, reject);
    });
  }
  const result = await pool.request().query(query);
  // TODO: implement functitions from string-utils
  // do not truse the source
  return result.recordsets[0];
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

export const close = () => {
  return sql.close();
};
