import {parser} from "./parser"
import {continuedIndent, indentNodeProp, foldNodeProp, foldInside, LRLanguage, LanguageSupport} from "@codemirror/language"

export const lambdaCalculusLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Object: continuedIndent({except: /^\s*\}/}),
        Array: continuedIndent({except: /^\s*\]/})
      }),
      foldNodeProp.add({
        "Object Array": foldInside
      })
    ]
  }),
  languageData: {
    closeBrackets: {brackets: ["("]},
    indentOnInput: /^\s*[\}\]]$/
  }
})

/// JSON language support.
export function lambdaCalculus() {
  return new LanguageSupport(lambdaCalculusLanguage)
}
