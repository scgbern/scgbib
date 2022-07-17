# Instructions:

In order to run the web server that conversts our .bib file -> .json one we have to type in the terminal:

"node bib2json.js"

Files utility:

- bib2json.js is the main file that is executed. The server.listen() is the actual main function that I used to start the parsing.

- lib.js contains the functionality of the different JS functions that can be reused throught the Node. They are exported through: module.exports = {someFunction},  it also contains the vital startParsing() function.

- output.json contains the already converted file, it can be deleted or overwritten 

- package.json is the heart of any Node project. this file holds various metadata relevant to the project. This file is used to give information to npm that allows it to identify the project as well as handle the project's dependencies.

- package-lock.json: A file that is automatically generated for any operations where npm modifies either the node_modules tree, or package.json. It describes the exact tree that was generated, such that subsequent installs are able to generate identical trees, regardless of intermediate dependency updates.

---

This code was originally written by Alexandru Filipescu as the backend of the citation search engine.

https://github.com/AlexandruFilipescu/Citation-Search-Engine

---
