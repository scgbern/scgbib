---
# TO DO

* Update the README

* Make the url query parameters consistent with the old scheme

* Clean up scgbib repo
	* set up github actions to test for errors and generate JS
	* set up assets/scgbib as a clone that can be pulled (won't work on yogi due to old RSA implementation)

---
# DONE

- Fix the URL1 links to PDF

- Fix handling of accents in scgbib
	- added latex2utf8.sh to translate latex backslash accents to UTF8 before converting to JSON
	- Caveat: incomplete; browse the generated _scgbib-translated.txt to find other backslash combinations to handle

---
