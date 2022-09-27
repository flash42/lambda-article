import "remirror/styles/all.css";

import { keymap } from "@codemirror/view";
import { oneDark } from "@codemirror/theme-one-dark";
import React from "react";
import { CodeMirrorExtension } from "@remirror/extension-codemirror6";
import {
  Remirror,
  ThemeProvider,
  useHelpers,
  useKeymap,
  useRemirror,
  useRemirrorContext,
  WysiwygToolbar,
} from "@remirror/react";

import {
  lambdaCalculus,
  lambdaCalculusDescription,
} from "../lang-lambda/lambdaCalculus";
import { wysiwygPreset } from "remirror/extensions";
import { TableExtension } from "@remirror/extension-react-tables";



const LAMBDA = "λ";

const extensions = () => [
  codeMirror(),
  new TableExtension(),
  ...wysiwygPreset(),
];

function codeMirror() {
  function insertLambdaCodemirror(view) {
    view.dispatch(
      view.state.update(view.state.replaceSelection(LAMBDA), {
        scrollIntoView: true,
        userEvent: "input",
      })
    );

    return true;
  }
  return new CodeMirrorExtension({
    languages: [lambdaCalculusDescription],
    extensions: [
      lambdaCalculus(),
      oneDark,
      keymap.of([{ key: "Ctrl-l", run: insertLambdaCodemirror }]),
    ],
  });
}

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


const Editor = (params) => {
  const { initialContent } = params;
  const { manager, state } = useRemirror({ extensions, initialContent });
  const useSave = () => {
    const { getJSON } = useHelpers();

    useKeymap("Mod-s", ({ state }) => {
      params.setDocument(getJSON(state));
      return true;
    });
  };
  const useLambda = () => {
    const insertText = useRemirrorContext().commands.insertText;

    useKeymap("Mod-l", () => {
      insertText(LAMBDA);
      return true;
    });
  };

  return (
    <ThemeProvider>
      <Remirror
        manager={manager}
        initialContent={state}
        autoRender="end"
        hooks={[useLambda, useSave]}
      >
        <CreateCodeMirrorButton language="lambdaCalculus" />
        <CreateLambdaButton></CreateLambdaButton>
        <WysiwygToolbar></WysiwygToolbar>
      </Remirror>
    </ThemeProvider>
  );
};

export default Editor;
