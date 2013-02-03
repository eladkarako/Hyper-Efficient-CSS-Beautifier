Hyper-Efficient-CSS-Beautifier
==============================

Hyper Efficient CSS Beautifier Engine Using Javascript as Beautifier Engine.


here is an example oh how to use it:

plain Javascript:
-------------------
var rawCSS = ".CodeMirror {/* Set height, width, borders, and global font properties here */font-family: \'arial\' \"aaa\" 'aaaa' monospace;height: 300px;}.CodeMirror-scroll { /* Set scrolling behaviour here */overflow: auto;}"
cssbeautifier(rawCSS);

will result with:
-------------------
".CodeMirror {
  /* Set height, width, borders, and global font properties here */
  font-family:'arial'"aaa"'aaaa' monospace;
  height: 300px;
}
.CodeMirror-scroll {
  /* Set scrolling behaviour here */
  overflow: auto;
}"


- c - r - e - d - i - t -
inspired by various css editors, and css highlighter engines,
inspired slightly by the code written by Harutyun Amirjanyan, (amirjanyan@gmail.com)
and the one used in the jsbeautifier project by Einar Lielmanis (elfz@laacz.lv).

its 100% cool new stuff.
