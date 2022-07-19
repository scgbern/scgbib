#! /bin/sh
#
# Sync this repo to its location on Yogi
#
# 2022-07-16

RSYNC="-avz --delete -e ssh --stats --progress"

LOCAL=/Users/oscar/Documents/Projects/scgbib-NEW/
TARGET=scg@yogi.inf.unibe.ch:/srv/scg.unibe.ch/scgbib/

rsync ${RSYNC} \
	'--exclude=_*' \
	${LOCAL} ${TARGET}

open http://scg.unibe.ch/scgbib

