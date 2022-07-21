# TO DO

- Check external links and remove broken ones

- Add support for “or” queries (with or-bars) ?

- Set up github actions to test for errors and generate JS

- Set up assets/scgbib as a clone that can be pulled (won't work on yogi due to old RSA implementation)

---
# DONE

- Added CSS to look more like scgpico 

- Added citation links

- Commented and refactored the code

- Added handlebar function to map bib item types to proper category headings

- Updates the READMEs

- Made scgbib case insensitive by default
	- convert search fields and fields to lower case before searching

- Handled all the remaining latex backslash to UTF8 translations

- Fix the URL1 links to PDF

- Fix handling of accents in scgbib
	- added latex2utf8.sh to translate latex backslash accents to UTF8 before converting to JSON
	- Caveat: incomplete; browse the generated _scgbib-translated.txt to find other backslash combinations to handle

---
