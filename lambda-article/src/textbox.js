import "remirror/styles/all.css";

import { keymap } from "@codemirror/view";
import { oneDark } from '@codemirror/theme-one-dark';
import React from 'react';
import { CodeMirrorExtension } from '@remirror/extension-codemirror6';
import { Remirror, ThemeProvider, useHelpers, useKeymap, useRemirror, useRemirrorContext, WysiwygToolbar} from '@remirror/react';
import {LanguageDescription} from "@codemirror/language";

import { lambdaCalculus } from './lang-lambda/lambdaCalculus';
import { wysiwygPreset } from 'remirror/extensions';
import { TableExtension } from '@remirror/extension-react-tables';
import { RemirrorRenderer } from "@remirror/react";
import { renderString } from './render-codemirror'
import {oneDarkHighlightStyle, oneDarkTheme } from '@codemirror/theme-one-dark'
import { Callout, CodeBlock, TextHandler, createIFrameHandler, Heading, Doc } from '@remirror/react';

const lambdaCalculusDescription = LanguageDescription.of({
    name: "lambdaCalculus",
    extensions: ["lc"],
    load() {
      return import("./lang-lambda/lambdaCalculus").then(m => m.lambdaCalculus())
    }
  })

function insertLambdaCodemirror(view) {
  view.dispatch(view.state.update(view.state.replaceSelection(LAMBDA), {scrollIntoView: true, userEvent: "input"}))

  return true
}


const extensions = () => [
  new CodeMirrorExtension({
    languages: [lambdaCalculusDescription],
    extensions: [
      lambdaCalculus(),
      oneDark,
      keymap.of([
        { key: "Ctrl-l", run: insertLambdaCodemirror }
      ]),
    ],
  }),
  new TableExtension(),
  ...wysiwygPreset()
];


const content = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Press the button to insert a new CodeMirror block.',
        },
      ],
    }
  ],
};

const CreateCodeMirrorButton = ({ language }) => {
  const { commands } = useRemirrorContext({ autoUpdate: true });
  const { createCodeMirror } = commands;
  const enabled = createCodeMirror.enabled({ language });

  return (
    <button
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => createCodeMirror({ language })}
      disabled={!enabled}
    >
      Create a {language} block
    </button>
  );
};

const LAMBDA = 'λ';


const CreateLambdaButton = () => {
  const { commands } = useRemirrorContext({ autoUpdate: true });
  const { insertText } = commands;
  return (
    <button
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => insertText(LAMBDA)}
    >
      {LAMBDA}
    </button>
  );
};


export const CodeMirrorBlock = (props) => {
  const content = props.node.content;
  console.log('@content', content);
  if (!content) {
    return null;
  }
  const a = renderString(content[0].text, oneDarkHighlightStyle, oneDarkTheme, {langProvider: lambdaCalculus().language}).code;
  console.log("@a: ", a);
  const innerHTML = {__html: a}
  return <div dangerouslySetInnerHTML={innerHTML} />;
};
const defaultTypeMap = {
  blockquote: 'blockquote',
  bulletList: 'ul',
  callout: Callout,
  doc: Doc,
  heading: Heading,
  paragraph: 'p',
  horizontalRule: 'hr',
  iframe: createIFrameHandler(),
  image: 'img',
  hardBreak: 'br',
  codeBlock: CodeBlock,
  orderedList: 'ol',
  text: TextHandler,
  codeMirror: CodeMirrorBlock
};


const TextBox = params => {
  const initialContent = params.loadDocument ? params.loadDocument : content;
  const { manager, state } = useRemirror({ extensions, initialContent});
  const useSave = () => {
    const { getJSON } = useHelpers();

    useKeymap('Mod-s', ({ state }) => {
      params.setDocument(getJSON(state));
      return true;
    });
  };
  const useLambda = () => {
    const insertText = useRemirrorContext().commands.insertText;

    useKeymap('Mod-l', () => {
      insertText(LAMBDA);
      return true;
    });
  };

  const editable = params.editable == null ? true : params.editable;
  if (!editable) {
    console.log("@params: ", params);
    // TODO replace contents https://remirror.io/docs/faq/
  }
  return (
    <ThemeProvider>
      {editable ? (
        <Remirror
          manager={manager}
          initialContent={state}
          autoRender="end"
          hooks={[useLambda, useSave]}
        >
          {editable ? (
            <CreateCodeMirrorButton language="lambdaCalculus" />
          ) : null}
          {editable ? <CreateLambdaButton></CreateLambdaButton> : null}
          {editable ? <WysiwygToolbar></WysiwygToolbar> : null}
        </Remirror>
      ) : (
        // TODO try to adapt for codeMirror node: https://github.com/jamischarles/codemirror-server-render/blob/main/index.js
        <RemirrorRenderer
          json={ initialContent }
          typeMap={defaultTypeMap}
        />
      //  <Remirror
      //     editable={false}
      //     manager={manager}
      //     initialContent={state}
      //     autoRender="end"
      //   >
      //   </Remirror>
      )}
    </ThemeProvider>
  );
};

export default TextBox;