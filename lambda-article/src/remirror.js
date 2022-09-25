import { languages } from '@codemirror/language-data';
import { oneDark } from '@codemirror/theme-one-dark';
import React from 'react';
// import { ProsemirrorDevTools } from '@remirror/dev';
import { CodeMirrorExtension } from '@remirror/extension-codemirror6';
import { Remirror, ThemeProvider, useRemirror, useRemirrorContext } from '@remirror/react';
import {LanguageDescription} from "@codemirror/language";

import { lambdaCalculus } from './lang-lambda/lambdaCalculus';


const lambdaCalculusDescription = LanguageDescription.of({
    name: "lambdaCalculus",
    extensions: ["lc"],
    load() {
      return import("./lang-lambda/lambdaCalculus").then(m => m.lambdaCalculus())
    }
  })

const extensions = () => [new CodeMirrorExtension({ 
    languages: [lambdaCalculusDescription, ...languages], 
    extensions: [lambdaCalculus(), oneDark]
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

const Basic = () => {
  const { manager, state } = useRemirror({ extensions, content });

  return (
    <ThemeProvider>
      <Remirror manager={manager} initialContent={state} autoRender='end'>
        <CreateCodeMirrorButton language='lambdaCalculus' />
        {/* <ProsemirrorDevTools /> */}
      </Remirror>
    </ThemeProvider>
  );
};

export default Basic;