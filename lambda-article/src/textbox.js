import "remirror/styles/all.css";

import { keymap } from "@codemirror/view";
import { oneDark } from '@codemirror/theme-one-dark';
import React, { useCallback } from 'react';
import { CodeMirrorExtension } from '@remirror/extension-codemirror6';
import { Remirror, ThemeProvider, useHelpers, useKeymap, useRemirror, useRemirrorContext, WysiwygToolbar} from '@remirror/react';
import {LanguageDescription} from "@codemirror/language";

import { lambdaCalculus } from './lang-lambda/lambdaCalculus';
import { wysiwygPreset } from 'remirror/extensions';
import { TableExtension } from '@remirror/extension-react-tables';


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

const hooks = [
  () => {
    const { getJSON } = useHelpers();

    const handleSaveShortcut = useCallback(
      ({ state }) => {
        console.log(`Save to backend: ${JSON.stringify(getJSON(state))}`);

        return true;
      },
      [getJSON],
    );

    useKeymap('Mod-s', handleSaveShortcut);
  },
  () => {
    const { commands } = useRemirrorContext();
    const { insertText } = commands;
    const handleInsertLambdaShortcut = useCallback(
      () => {
        insertText(LAMBDA);
        return true;
      },
      [insertText],
    );

    useKeymap('Mod-l', handleInsertLambdaShortcut);
  },
];

const TextBox = () => {
  const { manager, state } = useRemirror({ extensions, content });

  return (
    <ThemeProvider>
      <Remirror manager={manager} initialContent={state} autoRender='end' hooks={hooks}>
        <CreateCodeMirrorButton language='lambdaCalculus' />
        <CreateLambdaButton></CreateLambdaButton>
        <WysiwygToolbar></WysiwygToolbar>
      </Remirror>
    </ThemeProvider>
  );
};

export default TextBox;