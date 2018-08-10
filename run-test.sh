#!/bin/sh
PORT=3002

PORT=$PORT NODE_ENV="test" babel-node src/index.js &

## Grab PID of background process
PID=$!
PGID=$(ps axjf --sort=-pid | cut -d " " -f 2- | egrep ^$PID | head -1 | tr -s - " "  | cut -d " " -f 2)
echo "PGID: $PGID"
echo "Node.js app launching on PID: ${PID}. Port:$PORT Starting tests in 2 seconds."

## Give 2 sec for the node process to completely startup
sleep 2

jest
RETURN_VALUE=$?

## Kill background node process
echo "Killing app"
pkill --pgroup $PGID

exit $RETURN_VALUE