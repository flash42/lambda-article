import {styleTags, tags as t} from "@lezer/highlight"

export const lambdaCalculusHighlighting = styleTags({
  Lambda: t.keyword,
  Dot: t.separator,
  Rparen: t.paren,
  Lparen: t.paren
})
