import CodeMirror from '@uiw/react-codemirror';
import { lambdaCalculus } from './lang-lambda/lambdaCalculus';
import React from 'react';


const starterCode = `λx.y`;

function Codebox() {
    const onChange = React.useCallback((value, _) => {
        console.log('value:', value);
      }, []);
    return (
        <CodeMirror
        value={starterCode}
        height="200px"
        extensions={[lambdaCalculus()]}
        onChange={onChange}
      />
    );
  }
  
  export default Codebox;