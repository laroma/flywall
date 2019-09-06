#!/bin/sh
cp -f db.json.org db.json
yarn run server &
yarn start