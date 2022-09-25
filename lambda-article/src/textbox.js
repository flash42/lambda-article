import "remirror/styles/all.css";

import { BoldExtension } from "remirror/extensions";
import { basicSetup } from "@codemirror/basic-setup";
import { languages } from "@codemirror/language-data";
import { CodeMirrorExtension } from "@remirror/extension-codemirror6";
import { Remirror, useRemirror, useRemirrorContext } from "@remirror/react";

const codeMirrorExtension = new CodeMirrorExtension({
  languages: languages,
  extensions: [basicSetup],
});



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

export const TextBox = () => {
  const { manager, state } = useRemirror({
    extensions: () => [new BoldExtension()],
    content: "<p>I love <b>Remirror</b></p>",
    selection: "start",
    stringHandler: "html",
  });
//   const { manager, state } = useRemirror({ codeMirrorExtension, content: "Lambda calculus" });


  return (
    <div className="remirror-theme">
      {/* the className is used to define css variables necessary for the editor */}
      <Remirror manager={manager} initialContent={state} autoRender='end'>
        <CreateCodeMirrorButton language="JavaScript" />
      </Remirror>
    </div>
  );
};

export default TextBox;
