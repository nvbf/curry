#!/bin/sh
PORT=3002

PORT=$PORT NODE_ENV="test" babel-node src/index.js &

## Grab PID of background process
NODE_PID=$!
echo "Node.js app launching on PID: ${NODE_PID}. Port:$PORT Starting tests in 2 seconds."

## Give 2 sec for the node process to completely startup
sleep 2

jest
RETURN_VALUE=$?

## Kill background node process
kill $NODE_PID

exit $RETURN_VALUE