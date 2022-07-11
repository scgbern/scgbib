#! /bin/sh
D=`dirname "$0"`
cd "$D"

rm -f scgbib.json
node bib2json.js
mv scgbib.json ..