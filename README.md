# SCG Bibliography

This repo stores the bibliographic entries used for most of the [publications of the Software Composition Group](http://scg.unibe.ch/publications) as well as the implementation of the online [SCG bibliography search engine](http://scg.unibe.ch/scgbib).

## Overview

- [scg.bib](scg.bib) — this is the [bibtex](https://en.wikipedia.org/wiki/BibTeX) source file containing all the bibliographic entries
- [index.html](index.html) — the landing page for the search engine
- [scgbib.json](scgbib.json) — the JSON version of the bibliographic entries, generates from the bibtex source
- [json-conversion](json-conversion) — the perl and javascript scripts to convert the bibtex file to json
- [resources](resources) — javascript, css and other resources for the front end
- [Makefile](Makefile) — various automated build rules
- [cmd](cmd) — scripts used the Makefile
- [Linkchecker](Linkchecker) — scripts to check for broken links

If you need write access to this repo, please contact [me](https://github.com/onierstrasz).
If you need to update the contents, please check the [instructions](archive/INSTRUCTIONS.md).

This repo is a migration of the old scgbib repo formerly hosted on the SCG git repo.

The [search engine](http://scg.unibe.ch/scgbib) is based on a [prototype](https://github.com/AlexandruFilipescu/Citation-Search-Engine) written by
[Alexandru Filipescu](https://github.com/AlexandruFilipescu) as part of a [seminar project](http://scg.unibe.ch/wiki/projects/mastersbachelorsprojects/Implementing-a-citation-search-engine-in-JavaScript).
