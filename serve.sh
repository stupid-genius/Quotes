#!/bin/bash
# auto-reloading development server

set -e
set -a
. .env
set +a
APPPORT=3000

./node_modules/.bin/browser-sync start --port 9000 --proxy localhost:$APPPORT --no-open -f dist/client &
BSPID=$!
echo BrowserSync PID $BSPID
trap "kill -0 $BSPID && kill $BSPID" EXIT
(fswatch -ol 1 app/client | xargs -n1 -I{} ./build.sh spa) &
if [[ -z "$1" || "$1" -ne spa ]]; then
	npm run nodemon
else
	echo Server in SPA mode
	npx http-server -c-1 dist/client/ -p $APPPORT
fi
