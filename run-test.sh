#!/bin/sh

PORT=3002 NODE_ENV="test" node src/index.js &

## Grab PID of background process
NODE_PID=$!
echo "Node.js app launching on PID: ${NODE_PID}.  Starting tests in 2 seconds."

## Give about 2 sec for the node process to completely startup
sleep 2

./node_modules/.bin/mocha --compilers js:babel-core/register -u tdd --timeout 30000 $FILE
RETURN_VALUE=$?

## Kill background node process
kill $NODE_PID

exit $RETURN_VALUE