# Instructions:

To generate the json file from the bibtex source file, run

	make json

from the command line in the parent directory. This will perform:

	./latex2utf8.pl ../scg.bib > _scgbib-translated.txt
	node bib2json.js
	mv scgbib.json ..

The first line runs a perl script to translate latex-style accents to UTF8 characters. The second line runs a javascript node script to generate `scgbib.json` from the translated bibtex file. Finally the json file is moved back to the root.

- [bib2json.js](bib2json.js) is the main file that is executed. `server.listen()` is the main function that is used to start the parsing.

- [lib.js](lib.js) contains the JS functions used by `bib2json.js`. They are exported through: `module.exports = {someFunction}`. It also contains the vital `startParsing()` function.

- [package.json](package.json) is the heart of any Node project. This file holds various metadata relevant to the project. This file is used to give information to `npm` that allows it to identify the project as well as handle the project's dependencies.

- [package-lock.json](package-lock.json) is automatically generated for any operations where `npm` modifies either the `node_modules` tree, or `package.json`. It describes the exact tree that was generated, so that subsequent installs are able to generate identical trees, regardless of intermediate dependency updates.

---

The original [prototype](https://github.com/AlexandruFilipescu/Citation-Search-Engine) was written by
[Alexandru Filipescu](https://github.com/AlexandruFilipescu) as part of a [seminar project](http://scg.unibe.ch/wiki/projects/mastersbachelorsprojects/Implementing-a-citation-search-engine-in-JavaScript).

---
