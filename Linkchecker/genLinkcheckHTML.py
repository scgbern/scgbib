#! /usr/bin/env python3
#
# genLinkcheckHTML -- read the scgbib json and generate an HTML file that linkchecker can check

import os, json

# os.chdir('..')
bibFile = os.getcwd() + '/../scgbib.json'

f = open(bibFile, "r")
bib = json.loads(f.read())
f.close()

html = open('linkCheck.html', 'w')

html.write("""
<!doctype html>
<html lang="en-US">
<head>
    <meta charset="UTF-8">
</head>
<body>
<h1>SCG bib URLs to check</h1>
""")

# TO DO
# SKIP links to http://doi.acm.org

for entry in bib:
  if "URL" in entry:
    # print(entry["URL"])
    html.write(f'<a href="{entry["URL"]}">{entry["key"]}</a> \n')

html.write("""
</body>""")
html.close()