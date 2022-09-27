import { RemirrorRenderer } from "@remirror/react";
import {
  oneDarkHighlightStyle,
  oneDarkTheme,
} from "@codemirror/theme-one-dark";
import { lambdaCalculus } from "../lang-lambda/lambdaCalculus";
import { renderString } from "./render-codemirror";
import {
  Callout,
  CodeBlock,
  TextHandler,
  createIFrameHandler,
  Heading,
  Doc,
} from "@remirror/react";

export const CodeMirrorBlock = (props) => {
  const content = props.node.content;
  if (!content) {
    return null;
  }
  const a = renderString(content[0].text, oneDarkHighlightStyle, oneDarkTheme, {
    langProvider: lambdaCalculus().language,
  }).code;
  const innerHTML = { __html: a };
  return <div dangerouslySetInnerHTML={innerHTML} />;
};
const defaultTypeMap = {
  blockquote: "blockquote",
  bulletList: "ul",
  callout: Callout,
  doc: Doc,
  heading: Heading,
  paragraph: "p",
  horizontalRule: "hr",
  iframe: createIFrameHandler(),
  image: "img",
  hardBreak: "br",
  codeBlock: CodeBlock,
  orderedList: "ol",
  text: TextHandler,
  codeMirror: CodeMirrorBlock,
};

const Renderer = (params) => {
  const { document } = params;
  return <RemirrorRenderer json={document} typeMap={defaultTypeMap} />;
};

export default Renderer;
