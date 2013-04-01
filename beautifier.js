var cssbeautifier = function(rawcss) {
  'use strict';

  var k = 2;
  (typeof k == "string") && (k = parseInt(k, 10));

  function next() {
    return ch = rawcss.charAt(++pos)
  }

  function peek() {
    return rawcss.charAt(pos + 1)
  }

  function eatString(comma) {
    for(var q = pos; next();) if("\\" == ch) next(), next();
    else if(ch == comma) break;
    else if("\n" == ch) break;
    return rawcss.substring(q, pos + 1)
  }

  function eatWhitespace() {
    for(; whitespaceRegex.test(peek());) pos++
  }

  function eatComment() {
    var f = pos;
    for(next(); next();) if("*" == ch && "/" == peek()) {
      pos++;
      break
    }
    return rawcss.substring(f, pos + 1)
  }

  var whitespaceRegex = /^\s+$/,
    pos = -1,
    ch, indentString = rawcss.match(/^[\r\n]*[\t ]*/)[0],
    singleIndent = Array(k + 1).join(" "),
    indentLevel = 0,
    printer = {
      "{":function(f) {
        printer.isSingleSpace();
        output.push(f);
        printer.isNewLine(!1)
      },
      "}":function(f) {
        printer.isNewLine(!1);
        output.push(f);
        printer.isNewLine(!1)
      },
      isNewLine:function(f) {
        if(!f) for(; whitespaceRegex.test(output[output.length - 1]);) output.pop();
        output.length && output.push("\n");
        indentString && output.push(indentString)
      },
      isSingleSpace:function() {
        output.length && !whitespaceRegex.test(output[output.length - 1]) && output.push(" ")
      }
    },
    output = [];
  for(indentString && output.push(indentString); ;) {
    var conditionIterator, start = pos;
    do;
    while(whitespaceRegex.test(next()));
    conditionIterator = pos != (start + 1);
    if(!ch) break;
    "{" == ch ? (indentLevel++, indentString += singleIndent, printer["{"](ch)) :                            //handle special cases of {} .
    "}" == ch ? (indentLevel--, indentString = indentString.slice(0, -k), printer["}"](ch)) :                //handle special cases of {} .
    '"' == ch || "'" == ch ? output.push(eatString(ch)) :                                                    //handle inverted-commas pers.
    ";" == ch ? output.push(ch, "\n", indentString) :                                                        //add new-line feed.
    "/" == ch && "*" == peek() ? (printer.isNewLine(!1), output.push(eatComment(), "\n", indentString)) :    //note and remarks handling.
    "(" == ch ? "url" == rawcss.substring(pos - 3, pos).toLowerCase() ?                                      //usage of url in css.
        (output.push(ch), eatWhitespace(), next() && (")" != ch && '"' != ch && "'" != ch ? output.push(eatString(")")) : pos--)) :
        (conditionIterator && printer.isSingleSpace(), output.push(ch), eatWhitespace()) : ")" == ch ? output.push(ch) :  //( ) are gentel.
    "," == ch ? (eatWhitespace(), output.push(ch), printer.isSingleSpace()) :                                //single space after comma.
    ("]" != ch && ("[" == ch || "=" == ch ? eatWhitespace() :                                                //eat space before and after [ ] .
    conditionIterator && printer.isSingleSpace()), output.push(ch))
  }
  return(output.join("").replace(/[\n ]+$/, ""));

};

var cssunbeautifier = function(rawcss) {
  'use strict';
   var s = rawcss;

   s = s.replace(/\n/ig,'');
   s = s.replace(/\s*:\s*/ig,':');
   s = s.replace(/\s*\,\s*/ig,',');
   s = s.replace(/\s*\{\s*/ig,'{');
   s = s.replace(/\s*\}\s*/ig,'}');
   s = s.replace(/\s*\;\s*/ig,';');

  return( s );
};


//testing: unmark this and put in firebug console.
//var rawcss = ".CodeMirror {/* Set height, width, borders, and global font properties here */font-family: \'arial\' \"aaa\" 'aaaa' monospace;height: 300px;}.CodeMirror-scroll { /* Set scrolling behaviour here */overflow: auto;}"
//cssbeautifier(rawcss);