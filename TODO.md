# TO DO

* Fix the category headings

* Update the README

* How to make the record key visible?
	- Generate a query to this record
	- Add a bibtex view? (how to generate bibtex from json?)

* Missing support for “or” queries (with or-bars)

* Clean up scgbib repo
	* set up github actions to test for errors and generate JS
	* set up assets/scgbib as a clone that can be pulled (won't work on yogi due to old RSA implementation)

---
# DONE

- Made scgbib case insensitive by default
	- convert search fields and fields to lower case before searching

- Handled all the remaining latex backslash to UTF8 translations

- Fix the URL1 links to PDF

- Fix handling of accents in scgbib
	- added latex2utf8.sh to translate latex backslash accents to UTF8 before converting to JSON
	- Caveat: incomplete; browse the generated _scgbib-translated.txt to find other backslash combinations to handle

---
