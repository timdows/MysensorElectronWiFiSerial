#!/bin/sh
cd "$(dirname "$0")"

git reset --hard
git pull

cp common.js ../node_modules/@angular/cli/models/webpack-configs/common.js
cp .env ../.env

cd ..

ng build --base-href ..\\dist\\

DISPLAY=:0 electron .