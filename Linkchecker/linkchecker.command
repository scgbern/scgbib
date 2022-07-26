#! /bin/sh
#
# See: https://linkchecker.github.io/linkchecker/

D=`dirname "$0"`
cd "$D"
log=log.$$.txt

./genLinkcheckHTML.py

linkchecker ./linkCheck.html --check-extern > $log

open $log
