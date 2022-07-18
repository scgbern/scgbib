#! /usr/bin/perl -p
#
# Translate latex (backslash) accents to UTF8
#
# Caveat -- this list of translation is incomplete.
# To find other characters to translate, run `make json`, and browse _scgbib-translated.txt for backslashes.

# Remove noise
s/\\\\//g;
s/\{([aeiouAEIOU])\}/\1/g;
s/\\\-//g;
s/\\([{}])/\1/g;

# Greek letters
s/\$\\lambda\$/λ/g;
s/\$\\nu\$/ν/g;
s/\$\\pi\$/π/g;
s/\\pi/π/g;
s/\$\\tau\$/τ/g;
s/\\tau/τ/g;
s/\\Theta/θ/g;
s/\\omega/ω/g;
s/\\pobl/ποβλ/g;

# Oddballs
s/\$\\neq\$/≠/g;
s/\$\\sim\$/~/g;
s/\-\-\-/—/g;\
s/\-\-/—/g;\
s/\\ie/i.e./g;
s/\\eg/e.g./g;

# Remove escapes
s/\\[_%#\$: ]/\1/g;

# Cruft
s/\\f[IRP]//g;
s/\\url//g;
s/\\emph//g;
s/\\it //g;
s/\\em //g;
s/\\wedge/wedge/g;
s/\\cite//g;

# Various accents
s/\\ss/ß/g;
s/\\ae/æ/g;
s/\{\\i\}/ı/g;
s/\{\\l\}/ł/g;
s/\\l/ł/g;

s/\\v\{c\}/č/g;
s/\\v\{C\}/Č/g;
s/\\ue/ĕ/g;
s/\\u\{g\}/ğ/g;
s/\\v\{g\}/ğ/g;
s/\\u\{r\}/ř/g;
s/\\v\{r\}/ř/g;
s/\\v\{s\}/š/g;
s/\\v\{S\}/Š/g;
s/\\u\{z\}/ž/g;
s/\\v\{z\}/ž/g;

s/\\'\{n\}/ń/g;
s/\\'\{S\}/Ś/g;

s/\\~a/ã/g;
s/\\~\{a\}/ã/g;
s/\\~n/ň/g;
s/\\~\{n\}/ň/g;

s/\\'c/ć/g;
s/\\'\{c\}/ć/g;
s/\\,c/ç/g;
s/\\,\{c\}/ç/g;
s/\\c\{c\}/ç/g;
s/\\,s/ş/g;
s/\\cs/ş/g;
s/\\c\{s\}/ş/g;
s/\\c\{t\}/ţ/g;

s/\\\/o/ø/g;
s/\\\/O/Ø/g;

s/\\AA/Å/g;
s/\\aa/å/g;

s/\{\\'a\\}/á/g;
s/\{\\'e\\}/é/g;
s/\{\\'i\\}/í/g;
s/\{\\'o\\}/ó/g;
s/\{\\'u\\}/ú/g;

s/\{\\'A\\}/Á/g;
s/\{\\'E\\}/É/g;
s/\{\\'I\\}/Í/g;
s/\{\\'O\\}/Ó/g;
s/\{\\'U\\}/Ú/g;

s/\{\\`a\\}/à/g;
s/\{\\`e\\}/è/g;
s/\{\\`i\\}/ì/g;
s/\{\\'\\i\\}/ì/g;
s/\{\\`o\\}/ò/g;
s/\{\\`u\\}/ù/g;

s/\{\\`A\\}/À/g;
s/\{\\`E\\}/È/g;
s/\{\\`I\\}/Ì/g;
s/\{\\`O\\}/Ò/g;
s/\{\\`U\\}/Ù/g;

s/\{\\"a\\}/ä/g;
s/\{\\"e\\}/ë/g;
s/\{\\"i\\}/ï/g;
s/\{\\"o\\}/ö/g;
s/\{\\"u\\}/ü/g;

s/\{\\"A\\}/Ä/g;
s/\{\\"E\\}/Ë/g;
s/\{\\"I\\}/Ï/g;
s/\{\\"O\\}/Ö/g;
s/\{\\"U\\}/Ü/g;

s/\{\\'\\i\}/ì/g;
s/\{\\'\{\\i\}\}/ì/g;

s/\\'a/á/g;
s/\\'e/é/g;
s/\\'i/í/g;
s/\\'\\i/í/g;
s/\\'\{\\i\}/í/g;
s/\\'o/ó/g;
s/\\'u/ú/g;

s/\\'A/Á/g;
s/\\'E/É/g;
s/\\'I/Í/g;
s/\\'O/Ó/g;
s/\\'U/Ú/g;

s/\\`a/à/g;
s/\\`e/è/g;
s/\\`i/ì/g;
s/\\'\\i/ì/g;
s/\\`o/ò/g;
s/\\`u/ù/g;

s/\\\'\{y\}/ý/g;
s/\\\`\{y\}/ý/g;

s/\\`A/À/g;
s/\\`E/È/g;
s/\\`I/Ì/g;
s/\\`O/Ò/g;
s/\\`U/Ù/g;

s/\\"a/ä/g;
s/\\"e/ë/g;
s/\\"i/ï/g;
s/\\"o/ö/g;
s/\\"u/ü/g;

s/\\"A/Ä/g;
s/\\"E/Ë/g;
s/\\"I/Ï/g;
s/\\"O/Ö/g;
s/\\"U/Ü/g;

s/\\\^a/â/g;
s/\\\^e/ê/g;
s/\\\^i/î/g;
s/\\\^\\i/î/g;
s/\\\^o/ô/g;
s/\\\^u/û/g;

s/\\\^A/Â/g;
s/\\\^E/Ê/g;
s/\\\^I/Î/g;
s/\\\^O/Ô/g;
s/\\\^U/Û/g;

s/\\&/\&/g;

# Escaped trailing / -- not to be confused with \/o
s/\\\//\//g;
s/\\\~/~/g;

