# POC blog editor and renderer

I've integrated [Remirror](https://codemirror.net/) and [CodeMirror](https://codemirror.net/) and written an (incomplete) lambda-calculus language extension to CodeMirror. With these tools I've modelled an article editing workflow (no backend).

Remirror is a wrapper around ProseMirror which can embed CodeMirror editor blocks. These editor libraries are easy to extend with menus and shortcuts which I've explored a bit.

ProseMirror can serialize its contents as a JSON document. Remirror provides an incomplete Render component which can render the JSON format. I've extended this with a CodeMirror renderer based on an [open source project](https://github.com/jamischarles/codemirror-server-render).

The end result is a two pane editor where in one pane we can edit code and on save. In the other pane we can see the preview rendered based on the exported document state.

![App screenshot](https://github.com/flash42/lambda-article/blob/master/screenshot.png)
