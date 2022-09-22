import CodeMirror from '@uiw/react-codemirror';
import { lambdaCalculus } from './lang-lambda/lambdaCalculus';
import React from 'react';


const starterCode = `{
    "firstName": 'John',
    "lastName": "Smith",
    "isAlive": true,
    "age": 27,
    "address": {
      "streetAddress": "21 2nd Street",
      "city": "New York",
      "state": "NY",
      "postalCode": "10021-3100"
    },
    "phoneNumbers": [
      {
        "type": "home",
        "number": "212 555-1234"
      },
      {
        "type": "office",
        "number": "646 555-4567"
      }
    ],
    "children": [
        "Catherine",
        "Thomas",
        "Trevor"
    ],
    "spouse": null
  }`;

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