import fetch from "isomorphic-unfetch";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT;
const APP_BASEURL = `http://localhost:${PORT}`;

const paths = [
  "/ranking/JU21/10",
  "/tournaments/future",
  "/tournaments/finished",
  "/tournaments/220",
  "/tournaments",
  "/points",
  "/points/2460",
  "/players",
  "/players/2460"
];

// test(
//   "All urls gives 200",
//   async () => {
//     for (const path of paths) {
//       await getJsonFromFetch(path);
//     }
//   },
//   10000
// );

test("RegisterTeam", async () => {
  const url = `${APP_BASEURL}/RegisterTeam`;
  const testTournamentId = 193;
  const body = {
    TurneringsId: testTournamentId,
    Spiller_1: 2460,
    Spiller_2: 2530,
    Klasse: "M",
    TransactionId: "testId"
  };
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
  });
  const resJson = await res.json();
  console.log(resJson);
  const { TurneringId, LagId, Lagnavn, Lagnavnkort } = resJson[0];
  console.log(TurneringId, LagId, Lagnavn, Lagnavnkort);
  const TurneringIdExpected = 193;
  const LagIdExpected = 4;
  const LagnavnExpected = "Sindre Øye Svendby / Håkon Tveitan";
  const LagnavnkortExpected = "S. Svendby / H. Tveitan";

  expect(TurneringId).toBe(TurneringIdExpected);
  expect(LagId).toBeTruthy();
  expect(Lagnavn).toBe(LagnavnExpected);
  expect(Lagnavnkort).toBe(LagnavnkortExpected);
});

async function getJsonFromFetch(path) {
  const url = `${APP_BASEURL}${path}`;
  console.log(url);
  const res = await fetch(url);
  return await res.json();
}
