# ----------------------------------------------------------------------
# NB: some of the make rules here assume that the git repo
# users-oscar-bin-scripts is checked out and in your path.
# Eg for rsplit
b = scg.bib
bl = BORIS-Backlog
# ----------------------------------------------------------------------
all : autocheckin

# Prompt for log msg instead of firing up an editor
autocheckin : json sort test
	@/bin/echo -n "Please enter your log message: "
	@sh -c 'read m; git commit -a -m "$$m"'
	@git pull && git push
	@git gc

# alternative version that fires up vi
checkin : sort test
#	git commit -a
	git pull && git push
	git gc

test :
	ruby cmd/testbib.rb $b

# NB: only update the scg.bib if there is a difference
sort :
	cp scg.bib backup.bib
	perl -s cmd/bibsort backup.bib > sorted.bib
	@cmp -s scg.bib sorted.bib ; \
	RETVAL=$$? ; \
	if [ $$RETVAL -eq 0 ]; then \
		rm sorted.bib ; \
	else \
		mv sorted.bib scg.bib ; \
	fi
# ----------------------------------------------------------------------
# Convert scgbib to json
json : scgbib.json
scgbib.json : scg.bib
	cd json-conversion; \
	./latex2utf8.pl ../scg.bib > _scgbib-translated.txt; \
	node bib2json.js; \
	mv scgbib.json ..
# ----------------------------------------------------------------------
# fold long lines
fold :
	cp scg.bib backup.bib
	perl -p -e 'print ".\n";' backup.bib \
	| fmt -80 \
	| perl -n -e '/^\.$$/ && (next);' -e 'print;' > scg.bib

noabstract : $b
	rgrep scg-pub $b | rgrep 2005 > noabstract
	rsplit abstract noabstract t
	rm -f t
# ----------------------------------------------------------------------
# check links
cl : links
	if test ! -d linkdoc; then mkdir linkdoc; fi
	linklint -doc linkdoc -proxy proxy.iam.unibe.ch:8080 @links
	open linkdoc/urlindex.html

links : $b
	perl -n \
		-e '$$/ = "";' \
		-e 's/\s+/\n/g;' \
		-e '/url\s*=\s*{([^}]*)}/ && (print "$$1\n");' \
		$b \
	| sed '/citeseer/d' \
	| sort -u > $@
# ----------------------------------------------------------------------
# ON scg-pub journal entries missing an Annote field
noannote : $b
	rm -f t-*
	cp $b t-others
	rsplit scg-pub t-others t-scg-noannote
	rsplit Annote t-scg-noannote t-scgok
	rsplit Nierstrasz t-scg-noannote t-scg-noannote-on
	rsplit @article t-scg-noannote-on t-scg-noannote-on-article
# ----------------------------------------------------------------------
# t-scgmissing contains scg-pub papers without a url field
# the t-* files can be bibsorted together again to reform the scg.bib
missing : $b
	rm -f t-*
	cp $b t-others
	rsplit scg-pub t-others t-scgmissing
	rsplit url t-scgmissing t-scgok
	rsplit MISSINGPDF t-scgmissing t-scgflagged
# ----------------------------------------------------------------------
# BORIS -- http://boris.unibe.ch

# t-free contains papers that are missing a suitable keyword (scgN)
# You can edit and bibsort the t-* files to rebuild scg.bib
boris :
	rm -f t-*
	cp $b t-all
	rsplit scg- t-all t-free
	rsplit scg-none t-free t-none
	rsplit scg0 t-free t-scg0N
	rsplit scg1 t-free t-scg1N
	rsplit scg2 t-free t-scg2N
	rsplit scg-msc t-free t-msc
	rsplit scg-ip t-free t-ip
	rsplit scg-bp t-free t-bp
	rsplit scg-wp t-free t-wp
	rsplit scg-sub t-free t-sub
	rsplit scg-old t-free t-old

b22 :
	rgrep scg22 $b > $@
	rsplit scg-bp $@ tmp
	rsplit scg-msc $@ tmp
	-rm -f tmp

backlog :
	rm -rf t-* $(bl)
	cp $b t-all
	rgrep scg-pub $b > t-pub
	rgrep scg-phd $b > t-phd
	bibsort t-phd t-pub > t-bl
	rsplit scg16 t-bl t-16
	rsplit scg15 t-bl t-15
	rsplit scg14 t-bl t-14
	mkdir $(bl)
	cp t-bl $(bl)/scg1995-2013.bib
	cp t-14 $(bl)/scg2014.bib
	cp t-15 $(bl)/scg2015.bib
	cp t-16 $(bl)/scg2016.bib
	zip -yr $(bl).zip $(bl)
	rm -rf t-* $(bl)

# ----------------------------------------------------------------------
f = factscience.bib
fsyear=scg13

$f : $b
	rgrep $(fsyear) $b > $@

fs2012 : $f
	# rgrep Caracciolo $f > $@-Caracciolo.bib
	# rgrep Chis $f > $@-Chis.bib
	rgrep Kurs $f > $@-Kurs.bib
	rgrep Lungu $f > $@-Lungu.bib
	rgrep Nierstrasz $f > $@-Nierstrasz.bib
	rgrep Perin $f > $@-Perin.bib
	rgrep Renggli $f > $@-Renggli.bib
	rgrep Ressia $f > $@-Ressia.bib
	rgrep Schwarz $f > $@-Ressia.bib
	rgrep Wernli $f > $@-Wernli.bib

# See: Erfassen der Publikationen.txt
# t-$@ contains publications for this year
# Edit this and bibsort t-* to rebuild scg.bib
$(fsyear) :
	rm -rf t-*
	cp $b t-all
	rsplit scg- t-all t-scg
	rsplit 2013 t-scg t-$@
	rsplit scg-bp t-$@ t-bp
	rsplit scg-msc t-$@ t-msc
	rsplit scg-phd t-$@ t-phd
	# Entries in t-free should probably be tagged with $@
	mv t-$@ t-free
	rsplit $@ t-free t-$@
	# mate .
	# mate t-$@ t-free
	# We should convert selected instances of @book to @bookeditor
	cp t-$@ $@.bib
	# mate t-$@ $@.bib

# FactScience sanity check
check :
	rm -f t-*
	cp $b t-all
	rsplit $(fsyear) t-all t-missing-both
	rsplit -i Peerreview t-missing-both t-peer-only
	rsplit -i Medium t-missing-both t-medium-only
	rsplit -i Medium t-peer-only t-peer-medium

# ----------------------------------------------------------------------
lncsisbn :
	rm -rf t-*
	cp $b t-all
	rsplit scg-pub t-all t-scg
	rsplit -i skipdoi t-scg t-nodoi
	rsplit -i lncs t-scg t-lncs-tocheck
	rsplit -i isbn t-lncs-tocheck t-lncsisbn
	mate t-*

# ----------------------------------------------------------------------
jb05 :
	./mkjbrefs jb05 > $@.tex

# t-free contains papers that are missing a suitable keyword (jbNN)
# You can edit and bibsort the t-* files to rebuild scg.bib
jbcheck :
	rm -f t-*
	cp $b t-all
	rsplit scg- t-all t-free
	rsplit jb t-free t-jb
	rsplit scg-wp t-free t-wp
	rsplit scg-sub t-free t-sub
	rsplit scg-old t-free t-old
# ----------------------------------------------------------------------
# t-free contains papers that are missing a suitable keyword
# (snfNN or recast)
# You can edit and bibsort the t-* files to rebuild scg.bib
snfcheck :
	cp $b t-all
	rsplit scg- t-all t-free
	rsplit snf t-free t-snf
	rsplit hasler0 t-free t-hasler
	rsplit hasler10 t-free t-hasler10
	rsplit norex0 t-free t-norex
	rsplit recast0 t-free t-recast
	rsplit pecos t-free t-pecos
	rsplit famoos t-free t-famoos
	rsplit coordination t-free t-coordination
	rsplit jb-none t-free t-none
	rsplit scg-wp t-free t-wp
	rsplit scg-sub t-free t-sub
	rsplit scg-old t-free t-old
	rsplit scg-misc t-free t-misc
# ----------------------------------------------------------------------
doicheck :
	cp $b t-all
	rsplit scg-pub t-all t-free
	rsplit skipdoi t-free t-skipdoi
	rsplit doi t-free t-doi
# ----------------------------------------------------------------------
fieldNames : $b
	perl -n -e '/(\w+)\s+=/ && (printf "%s\n", $$1)' $b | sort -u > $@

keywords : $b
	perl -n -e '$$/ = "";' \
		-e '/keywords\s+=\s*{([^}]+)}/ && (printf "%s\n", $$1)' $b \
	| tr -cs "[:alpha:]" "\n" \
	| sort \
	| uniq -c \
	| sort -rn > $@
# ----------------------------------------------------------------------
clean :
	rm -f tmp.* errs t-* $f fs*.bib
# ----------------------------------------------------------------------
onpubs :
	rgrep -i 'author\s*=[^=]*Nierstrasz' $b > $@
# ----------------------------------------------------------------------
bib : all
# ----------------------------------------------------------------------
# Convenience for niko
.PHONY: git
git: 
	make test && make sort && git add scg.bib && echo Staged scg.bib.
# ----------------------------------------------------------------------
