import 'remirror/styles/all.css';

import { BoldExtension } from 'remirror/extensions';
import { Remirror, useRemirror } from '@remirror/react';

export const TextBox = () => {
  const { manager, state } = useRemirror({
    extensions: () => [new BoldExtension()],
    content: '<p>I love <b>Remirror</b></p>',
    selection: 'start',
    stringHandler: 'html',
  });

  return (
    <div className='remirror-theme'>
      {/* the className is used to define css variables necessary for the editor */}
      <Remirror manager={manager} initialContent={state} />
    </div>
  );
};

export default TextBox; 