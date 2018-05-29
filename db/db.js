import dotenv from "dotenv";
import sql from "mssql";

dotenv.config();

let init = false;
let pool = null;

export async function query(query) {
  if (!init) {
    console.log("INIT");
    pool = await sql.connect(process.env.CONNECTION_STRING);
    init = true;
  }
  console.log("QUERY");
  const result = await pool.request().query(query);
  return result.recordsets;
}

sql.on("error", err => {
  console.log("SQL ON ERROR:", err);
  console.log(err);
});
