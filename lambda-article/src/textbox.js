import "remirror/styles/all.css";

import { languages } from '@codemirror/language-data';
import { keymap } from "@codemirror/view";
import { oneDark } from '@codemirror/theme-one-dark';
import React, { useCallback } from 'react';
import { CodeMirrorExtension } from '@remirror/extension-codemirror6';
import { Remirror, ThemeProvider, useHelpers, useKeymap, useRemirror, useRemirrorContext } from '@remirror/react';
import {LanguageDescription} from "@codemirror/language";

import { lambdaCalculus } from './lang-lambda/lambdaCalculus';


const lambdaCalculusDescription = LanguageDescription.of({
    name: "lambdaCalculus",
    extensions: ["lc"],
    load() {
      return import("./lang-lambda/lambdaCalculus").then(m => m.lambdaCalculus())
    }
  })

function insertLambdaCodemirror(view) {
  view.dispatch(view.state.update(view.state.replaceSelection(LAMBDA), {scrollIntoView: true, userEvent: "input"}))
  // const transaction = view.state.update({changes: {from: view.state.selection.ranges[0].from, insert: LAMBDA}});

  // view.dispatch(transaction);
  return true
}

const extensions = () => [new CodeMirrorExtension({ 
    languages: [lambdaCalculusDescription, ...languages], 
    extensions: [lambdaCalculus(), oneDark, keymap.of([{ key: 'Ctrl-l', run: insertLambdaCodemirror}])]
    
})];


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

        return true; // Prevents any further key handlers from being run.
      },
      [getJSON],
    );

    // "Mod" means platform agnostic modifier key - i.e. Ctrl on Windows, or Cmd on MacOS
    useKeymap('Mod-s', handleSaveShortcut);
  },
  () => {
    const { commands } = useRemirrorContext();
    const { insertText } = commands;
    const handleInsertLambdaShortcut = useCallback(
      () => {
        insertText(LAMBDA);
        return true; // Prevents any further key handlers from being run.
      },
      [insertText],
    );

    // "Mod" means platform agnostic modifier key - i.e. Ctrl on Windows, or Cmd on MacOS
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
      </Remirror>
    </ThemeProvider>
  );
};

export default TextBox;