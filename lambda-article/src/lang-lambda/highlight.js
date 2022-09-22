import {styleTags, tags as t} from "@lezer/highlight"

export const lambdaCalculusHighlighting = styleTags({
  "λ": t.keyword,
  Dot: t.separator,
  Rparen: t.paren,
  Lparen: t.paren
})
