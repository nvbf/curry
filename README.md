# Curry

Works together with salt as the api for salt.
Connects to a mssql server.

## Development

rename `.env.sample` to `.env` and go trought all the env var.

Run `DEBUG="*,-babel" yarn dev` to start.

## One offs

### Register team

uncomment the toplines of `./one-offs/signup-manully.js` so that it is correct for the signup you want to do
then run:
`babel-node one-offs/signup.js`

### List all players in a tournament class

`babel-node one-offs/list-signups.js <tournamentId> <class>`
