const http = require('http');
const lib = require('./lib');
const fs = require('fs');
const jsonfile = require('jsonfile');
const hostname = '127.0.0.1';
const port = 3000;

/* lib.startParsing('../scg.bib'); */

lib.startParsing('_scgbib-translated.txt');


/*
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');    
});

// We need to wait to exit until the job is done.
// How to structure this correctly?

server.listen(port, hostname, () =>  {
    console.log(`Server running at http://${hostname}:${port}/`);
    lib.startParsing('../scg.bib');  //This converts the .bib => JSON
    // process.exit();
});
*/