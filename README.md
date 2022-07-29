# SCG Bibliography

This repo stores the bibliographic entries used for most of the [publications of the Software Composition Group](http://scg.unibe.ch/publications) as well as the implementation of the online [SCG bibliography search engine](http://scg.unibe.ch/scgbib).

## Overview

- [scg.bib](https://github.com/scgbern/scgbib/blob/main/scg.bib) — this is the [bibtex](https://en.wikipedia.org/wiki/BibTeX) source file containing all the bibliographic entries
- [index.html](https://github.com/scgbern/scgbib/blob/main/index.html) — the landing page for the search engine
- [scgbib.json](https://github.com/scgbern/scgbib/blob/main/scgbib.json) — the JSON version of the bibliographic entries, generates from the bibtex source
- [json-conversion](https://github.com/scgbern/scgbib/tree/main/json-conversion) — the perl and javascript scripts to convert the bibtex file to json
- [resources](https://github.com/scgbern/scgbib/tree/main/resources) — javascript, css and other resources for the front end
- [Makefile](https://github.com/scgbern/scgbib/blob/main/Makefile) — various automated build rules
- [cmd](https://github.com/scgbern/scgbib/tree/main/cmd) — scripts used the Makefile
- [Linkchecker](https://github.com/scgbern/scgbib/tree/main/Linkchecker) — scripts to check for broken links

This repo is a migration of the old scgbib repo formerly hosted on the SCG git repo.

The [search engine](http://scg.unibe.ch/scgbib) is based on a [prototype](https://github.com/AlexandruFilipescu/Citation-Search-Engine) written by
[Alexandru Filipescu](https://github.com/AlexandruFilipescu) as part of a [seminar project](http://scg.unibe.ch/wiki/projects/mastersbachelorsprojects/Implementing-a-citation-search-engine-in-JavaScript).
